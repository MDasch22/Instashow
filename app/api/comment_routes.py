from crypt import methods
from xml.etree.ElementTree import Comment
from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from flask_wtf.csrf import validate_csrf
from app.models import db, Comment
from app.forms.create_comment import CreateComment
from app.api.auth_routes import validation_errors_to_error_messages
from app.models.post import Post


comment_routes = Blueprint('comments', __name__)


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

    post = Post.query.get(form.data['postId'])

    return post.to_dict()

  else:
    return{'errors': validation_errors_to_error_messages(form.errors)}, 400
