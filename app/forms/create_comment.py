from flask_wtf import FlaskForm
from wtforms import TextAreaField, IntegerField
from wtforms.validators import DataRequired, ValidationError

# def comment_len(form, field):
#   comment = field.data
#   print("THIS IS THE COMMENT: ", comment)
#   if(len(comment) < 5):
#     raise ValidationError("Comment must be at least 5 characters.")

# def com_len(field, form):
#   comment = field.data['comment']
#   if(len(comment) > 50):
#     raise ValidationError("Comment cannot exceed 50 characters")

class CreateComment(FlaskForm):
  user_id = IntegerField('user_id')
  postId = IntegerField('postId')
  comment = TextAreaField('comment', validators=[ DataRequired()])
