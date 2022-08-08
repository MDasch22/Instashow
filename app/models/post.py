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
  comments = db.relationship("Comment", back_populates="post", cascade="all, delete")
  post_likes = db.relationship("User",
      secondary=likes,
      back_populates='user_likes',
  )

# USERS THAT LIKE POST
  def liking_post(self, user):
    posts_likes = [user.id for user in self.post_likes]
    return user.id in posts_likes

# LIKING A POST
  def like(self, user):
    if not self.liking_post(user):
      self.post_likes.append(user)

# UNLIKING A POST
  def unlike(self, user):
    if self.liking_post(user):
      self.post_likes.remove(user)


  def to_dict(self):
    return {
      'id': self.id,
      'user_id': self.user_id,
      'image': self.image,
      'caption': self.caption,
      'created_at': self.created_at,
      'updated_at': self.updated_at,
      'owner': self.owner.to_dict(),
      'comments': [comment.to_dict() for comment in self.comments],
      'likes': [user.to_dict_short() for user in self.post_likes]

    }
