from time import timezone
from .db import db
from .user import User
from sqlalchemy.sql import func
from sqlalchemy import DateTime
from .like import likes

class Post(db.Model):
  __tablename__= 'posts'

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  image = db.Column(db.String(500), nullable=False)
  caption = db.Column(db.String(500), nullable=True)
  created_at = db.Column(DateTime(timezone=True), server_default=func.now())
  updated_at = db.Column(DateTime(timezone=True), onupdate=func.now())

  owner = db.relationship("User", back_populates="user_posts")
  comments = db.relationship("Comment", back_populates="post")
  post_likes = db.relationship("User",
      secondary=likes,
      back_populates='user_likes',
      cascade="all, delete"
  )


  def to_dict(self):
    return {
      'id': self.id,
      'user_id': self.user_id,
      'image': self.image,
      'caption': self.caption,
      'created_at': self.created_at,
      'updated_at': self.updated_at,
      'ownerUsername': User.query.get(self.user_id).username
      # 'owner' : self.owner,
      # 'comments': self.comments,
      # 'post_likes': self.post_likes

    }
