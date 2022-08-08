from flask_wtf import FlaskForm
from wtforms import TextAreaField, IntegerField
from wtforms.validators import DataRequired, ValidationError


def comment_len(field, form):
  comment = field.data
  print("THIS IS THE COMMENT: ", comment)
  if(len(comment) < 5):
    raise ValidationError("Comment must be at least 5 characters.")

class EditComment(FlaskForm):
  postId = IntegerField('postId')
  edited_comment = TextAreaField('edited_comment', validators=[ DataRequired(), comment_len])
