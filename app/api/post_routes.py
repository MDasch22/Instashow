from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from flask_wtf.csrf import validate_csrf
from app.models import db, User, Post
from app.aws_upload_helper import (upload_file_to_s3, allowed_file, get_unique_filename)

post_routes = Blueprint('posts', __name__)

# GET ALL POST
@post_routes.route('/')
@login_required
def get_all_post():
  allPosts = Post.query.all()
  posts = [post.to_dict() for post in allPosts]

  return {'all_posts': posts}


# GET ALL POST BY USER_ID
@post_routes.route('/<username>')
# @login_required
def view_posts(username):
  user = User.query.filter(username == username).first()
  users_posts = Post.query.filter(Post.user_id == user.id).all()
  posts = [post.to_dict() for post in users_posts]

  return {'user_posts': posts}


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
