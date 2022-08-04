from flask_wtf import FlaskForm
from wtforms import TextAreaField
from wtforms.validators import DataRequired


class EditPostForm(FlaskForm):
  caption = TextAreaField('caption')
