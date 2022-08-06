from crypt import methods
from xml.etree.ElementTree import Comment
from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from flask_wtf.csrf import validate_csrf
from app.models import db, Comment , Post
from app.forms.create_comment import CreateComment
from app.api.auth_routes import validation_errors_to_error_messages



comment_routes = Blueprint('comments', __name__)

@comment_routes.route('/<int:post_id>')
@login_required
def get_post_comments(post_id):
  post = Post.query.get(post_id)
  comments = post.comments
  all_comments = [comment.to_dict() for comment in comments]
  return {'comments': all_comments}



@comment_routes.route('/new', methods=['POST'])
@login_required
def post_new_comment():
  form = CreateComment()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    new_comment = Comment(
      user_id = current_user.id,
      post_id = form.data['postId'],
      comment = form.data['new_comment']
    )
    db.session.add(new_comment)
    db.session.commit()

    return new_comment.to_dict()

  else:
    return{'errors': validation_errors_to_error_messages(form.errors)}, 400


@comment_routes.route('/<int:comment_id>/edit', methods=['PUT'])
@login_required
def edit_comment(comment_id):
  form = CreateComment()
  form['csrf_token'].data = request.cookies['csrf_token']
  comment = Comment.query.get(comment_id)
  if form.validate_on_submit():
    updated_comment = Comment (
      user_id = current_user.id,
      post_id = form.data['postId'],
      comment = form.data['new_comment']
    )
    db.session.add(updated_comment)
    db.session.commit()

    return comment.to_dict()
  else:
     return{'errors': validation_errors_to_error_messages(form.errors)}, 400


@comment_routes.route('/<int:comment_id>/delete', methods=['DELETE'])
@login_required
def delete_comment(comment_id):
  comment = Comment.query.get(comment_id)
  db.session.delete(comment)
  db.session.commit()

  return comment.to_dict()
