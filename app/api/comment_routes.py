from crypt import methods
from xml.etree.ElementTree import Comment
from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from flask_wtf.csrf import validate_csrf
from app.forms.edit_comment import EditComment
from app.models import db, Comment , Post
from app.forms.create_comment import CreateComment
from app.api.auth_routes import validation_errors_to_error_messages



comment_routes = Blueprint('comments', __name__)


@comment_routes.route('<id>/edit', methods=['PUT'])
@login_required
def update_comment(id):
    form = CreateComment()
    form['csrf_token'].data = request.cookies['csrf_token']
    comment = Comment.query.get(id)
    if form.validate_on_submit():
        comment.comment = form.data['comment']

        db.session.commit()
        return comment.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400




@comment_routes.route('/<int:comment_id>/delete', methods=['DELETE'])
@login_required
def delete_comment(comment_id):
  comment = Comment.query.get(comment_id)
  db.session.delete(comment)
  db.session.commit()

  return comment.to_dict()
