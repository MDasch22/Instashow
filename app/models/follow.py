from .db import db

follows = db.Table(
  "follows",
  db.Column('follower_id', db.Integer, db.ForeignKey('users.id')),
  db.Column('following_id', db.Integer, db.ForeignKey('users.id'))
)
