from flask_wtf import FlaskForm
from wtforms import TextAreaField, IntegerField
from wtforms.validators import DataRequired, ValidationError

def comment_len(form, field):
  comment = field.data
  print("THIS IS THE COMMENT: ", comment)
  if(len(comment) < 5):
    raise ValidationError("Comment must be at least 5 characters.")

class CreateComment(FlaskForm):
  postId = IntegerField('postId')
  new_comment = TextAreaField('comment', validators=[comment_len])
