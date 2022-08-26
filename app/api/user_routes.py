from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from flask_wtf.csrf import validate_csrf
from app.aws_upload_helper import (upload_file_to_s3, allowed_file, get_unique_filename)
from app.forms.edit_user import EditProfileForm
from app.api.auth_routes import validation_errors_to_error_messages
from app.models import db, User

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
# @login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


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


@user_routes.route('/profile/<int:id>/profileImg/edit', methods=["POST"])
@login_required
def update_profileImg(id):
    try:
        validate_csrf(request.cookies['csrf_token'])

        if "image" not in request.files:
            return {'errors': "PLease provide an Image"}

        image = request.files['image']

        if not allowed_file(image.filename):
            return {"Image must be: jpg, jpeg, png, or gif."}, 400

        image.filename = get_unique_filename(image.filename)

        upload = upload_file_to_s3(image)

        if 'url' not in upload:

            return upload, 400

        url = upload['url']

        edited_user = User.query.get(id)
        edited_user.profile_pic = url
        db.session.commit()

        return edited_user.to_dict()
    except:
        return {'errors': 'Invalid csrf token'}, 400
