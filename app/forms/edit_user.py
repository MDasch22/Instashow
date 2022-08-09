from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import User


def email_exists(form, field):
  current_user = User.query.get(form.data['id'])
  if(field.data == current_user.email):
    return
  email = field.data
  user = User.query.filter(User.email == email).first()
  if user:
    raise ValidationError("Email address is already being used.")


def username_exists(form, field):
  current_user = User.query.get(form.data['id'])
  if(field.data == current_user.username):
    return
  username = field.data
  user = User.query.filter(User.username == username).first()
  if user:
    raise ValidationError("Username is already in use.")


class EditProfileForm(FlaskForm):
  id = StringField('id')
  email = StringField('email', validators=[DataRequired(), email_exists])
  fullname = StringField('fullname', validators=[DataRequired()])
  username = StringField('username', validators=[DataRequired(), username_exists])
  bio = StringField('bio')
