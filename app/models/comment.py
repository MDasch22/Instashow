from .db import db
from sqlalchemy.sql import func
from sqlalchemy import DateTime

class Comment(db.Model):
  __tablename__ = "comments"

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  post_id = db.Column(db.Integer, db.ForeignKey("posts.id"), nullable=False)
  comment = db.Column(db.String(500), nullable=False)
  created_at = db.Column(DateTime(timezone=True), server_default=func.now())
  updated_at = db.Column(DateTime(timezone=True), onupdate=func.now())

  user = db.relationship("User", back_populates='user_comments')
  post = db.relationship("Post", back_populates='comments')



  def to_dict(self):
    return {
      'id': self.id,
      'user_id': self.user_id,
      'post_id': self.post_id,
      'comment': self.comment,
      'created_at': self.created_at,
      'updated_at': self.updated_at,
      'user': self.user,
      'post': self.post
    }
