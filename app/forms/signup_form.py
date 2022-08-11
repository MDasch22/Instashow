from tokenize import String
from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User
import re


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


# def email_checker(form, field):
#     email = field.data['password']
#     atIndex = email.find('@')
#     dotIndex = email.find('.', atIndex)
#     if(atIndex < 0 or dotIndex < 0):
#         raise ValidationError('Please enter a valid email address.')

# def email_validate(form, field):
#     email = field.data
#     if (not re.fullmatch('[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}', email)):
#         raise ValidationError('Please enter a valid email')

# def fullname_checker(form, field):
#     fullname = field.data['fullname']
#     if(len(fullname) < 5):
#         raise ValidationError("Fullname must be at least 5 characters.")


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired()])
    fullname = StringField('fullname', validators=[DataRequired()])
    email = StringField('email', validators=[DataRequired()])
    password = StringField('password', validators=[DataRequired()])
