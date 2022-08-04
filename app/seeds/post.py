from app.models import db, Post


def seed_post():
  post1 = Post(
    user_id = 1, image='https://instashowbucket.s3.us-west-1.amazonaws.com/test-post-image.jpg', caption='Loved this Trip')
  post2 = Post(
    user_id = 2, image='https://instashowbucket.s3.us-west-1.amazonaws.com/demo-seed-image.jpg', caption="Such a cool trip, would love to go again sometime!")



  db.session.add(post1)
  db.session.add(post2)

  db.session.commit()



def undo_post():
  db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
