from flask_wtf import FlaskForm
from wtforms import TextAreaField
from wtforms.validators import DataRequired, ValidationError

def caption_len(field, form):
  caption = field.data
  if(len(caption) < 5):
    raise ValidationError("Caption must be at least 5 characters")



class EditPostForm(FlaskForm):
  caption = TextAreaField('caption', validators=[DataRequired()])
