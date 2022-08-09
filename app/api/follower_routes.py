from crypt import methods
from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, User

follow_routes = Blueprint('follows', __name__)


@follow_routes.route('/follow/<int:userId>', methods=['PUT'])
@login_required
def follow(userId):
  user = User.query.get(userId)
  current_user.follow(user)
  db.session.commit()
  return user.to_dict_short()


@follow_routes.route('/unfollow/<int:userId>', methods=['PUT'])
@login_required
def unfollow(userId):
  user = User.query.get(userId)
  current_user.unfollow(user)
  db.session.commit()
  return user.to_dict_short()
