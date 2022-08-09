from crypt import methods
from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from flask_wtf.csrf import validate_csrf
from app.aws_upload_helper import (upload_file_to_s3, allowed_file, get_unique_filename)
from app.forms.edit_user import EditProfileForm
from app.api.auth_routes import validation_errors_to_error_messages
from app.models import db, User

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route("/profile/<username>")
@login_required
def get_user(username):
    user = User.query.filter(User.username == username).first()
    return user.to_dict()


@user_routes.route('/profile/<int:id>/edit', methods=['PUT'])
@login_required
def update_user(id):
    form = EditProfileForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        edited_user = User.query.get(id)

        edited_user.email = form.data['email']
        edited_user.fullname = form.data['fullname']
        edited_user.username = form.data['username']
        edited_user.bio = form.data['bio']

        db.session.commit()
        return edited_user.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
