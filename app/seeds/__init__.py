from flask.cli import AppGroup
from app.seeds.comments import seed_comments, undo_comments
from app.seeds.post import seed_post, undo_post
from .users import seed_users, undo_users

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_post()
    seed_comments()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_post()
    undo_comments()
    # Add other undo functions here
