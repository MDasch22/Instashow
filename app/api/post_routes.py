from crypt import methods
from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from flask_wtf.csrf import validate_csrf
from app.forms.edit_post import EditPostForm
from app.forms.create_comment import CreateComment
from app.models import db, User, Post, Comment
from app.api.auth_routes import validation_errors_to_error_messages
from app.aws_upload_helper import (upload_file_to_s3, allowed_file, get_unique_filename)

post_routes = Blueprint('posts', __name__)

# GET ALL POST
@post_routes.route('/')
@login_required
def get_all_post():
  allPosts = Post.query.all()
  posts = [post.to_dict() for post in allPosts]

  return {'all_posts': posts}

# GET SINGLE POST BY ID
@post_routes.route('/<int:post_id>')
@login_required
def get_single_post(post_id):
  post = Post.query.get(post_id)
  return post.to_dict()


# GET ALL POST BY USERNAME
@post_routes.route('/<username>')
@login_required
def view_posts(username):
  user = User.query.filter(User.username == username).first()
  users_posts = Post.query.filter(Post.user_id == user.id).all()
  posts = [post.to_dict() for post in users_posts]

  return {'user_posts': posts}


@post_routes.route('/explore/<int:id>')
@login_required
def get_explore(id):
  posts = Post.query.filter(Post.user_id != id).all()
  data = [post.to_dict() for post in posts]
  return {'post': data}


# CREATE A NEW POST
@post_routes.route('/new', methods=['GET','POST'])
@login_required
def create_post():

    validate_csrf(request.cookies['csrf_token'])

    if "image" not in request.files:
      return {'errors': "Please provide an Image"}

    image = request.files['image']

    if not allowed_file(image.filename):
      return {'errors': 'Image must be: jpg, jpeg, or png.'}, 400

    image.filename = get_unique_filename(image.filename)

    upload = upload_file_to_s3(image)

    if 'url' not in upload:
       # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to upload
        # so we send back that error message
      return upload, 400

    url = upload['url']
     # flask_login allows us to get the current user from the request

    new_post = Post(
      user_id=current_user.id,
      image=url,
      caption=request.form.get('caption'),
    )
    db.session.add(new_post)
    db.session.commit()
    return new_post.to_dict()

#EDIT POST BY ID
@post_routes.route('/<int:post_id>/edit', methods=['PUT'])
@login_required
def edit_user_post(post_id):
  form = EditPostForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  post_to_edit = Post.query.get(post_id)

  if form.validate_on_submit():

    post_to_edit.caption = form.data['caption']

    db.session.commit()
    return post_to_edit.to_dict()
  else:
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

#  DELETING POST BE post_id
@post_routes.route('/<int:post_id>/delete', methods=['DELETE'])
@login_required
def delete_post(post_id):
  deleted_post = Post.query.get(post_id)
  db.session.delete(deleted_post)
  db.session.commit()
  return f"{post_id}"


# GET ALL COMMENTS BY POST ID
@post_routes.route('/<int:post_id>/comments')
@login_required
def get_post_comments(post_id):
  post = Post.query.get(post_id)
  comments = post.comments
  all_comments = [comment.to_dict() for comment in comments]
  return {'comments': all_comments}


# CREATE NEW COMMENT ON POST
@post_routes.route('/<int:post_id>/comments/new', methods=['POST', 'GET'])
@login_required
def post_comment(post_id):
    form = CreateComment()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_comment = Comment(
            user_id=form.data['user_id'],
            post_id=post_id,
            comment=form.data['comment']
        )

        db.session.add(new_comment)
        db.session.commit()
        return new_comment.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# LIKING A POST
@post_routes.route('/like/<int:post_id>', methods=['PUT'])
@login_required
def like_post(post_id):
  post = Post.query.get(post_id)
  post.like(current_user)
  db.session.commit()
  return post.to_dict()

# UNLIKING A POST
@post_routes.route('/unlike/<int:post_id>', methods=['PUT'])
@login_required
def unlike_post(post_id):
  post = Post.query.get(post_id)
  post.unlike(current_user)
  db.session.commit()
  return post.to_dict()
