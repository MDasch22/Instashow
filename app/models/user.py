from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from sqlalchemy import DateTime
from sqlalchemy.sql import func
from .like import likes
from .follow import follows


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    profile_pic = db.Column(db.String(500), nullable=True, default='https://instashowbucket.s3.us-west-1.amazonaws.com/default-profile-icon-24.jpg')
    email = db.Column(db.String(255), nullable=False, unique=True)
    fullname = db.Column(db.String(100), nullable=False)
    username = db.Column(db.String(40), nullable=False, unique=True)
    bio = db.Column(db.String(150), nullable=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    time_created = db.Column(DateTime(timezone=True), server_default=func.now())
    time_updated = db.Column(DateTime(timezone=True), onupdate=func.now())

    user_posts = db.relationship("Post", back_populates='owner')
    user_comments = db.relationship("Comment", back_populates='user')
    user_likes = db.relationship("Post",
            secondary=likes,
            back_populates='post_likes',
            cascade='all, delete'
    )
    followers = db.relationship("User",
            secondary=follows,
            primaryjoin=(follows.c.follower_id == id),
            secondaryjoin=(follows.c.following_id == id),
            backref=db.backref('follows', lazy='dynamic'),
            lazy='dynamic'
    )


    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def user_following(self, user):
        return self.followers.filter(follows.c.following_id == user.id).count() > 0

    def follow(self, user):
        if not self.user_following(user):
            self.followers.append(user)

    def unfollow(self, user):
        if self.user_following(user):
            self.followers.remove(user)


    def to_dict_short(self):
        return {
            'id': self.id,
            'name': self.fullname,
            'username': self.username,
            'profile_pic': self.profile_pic,
        }

    def to_dict(self):
        return {
            'id': self.id,
            "profile_pic": self.profile_pic,
            'email': self.email,
            'fullname': self.fullname,
            'username': self.username,
            'bio': self.bio,
            'time_created': self.time_created,
            'time_updated': self.time_updated,
            'following': [user.to_dict_short() for user in self.followers],
            'followers': [user.to_dict_short() for user in self.follows]
        }
