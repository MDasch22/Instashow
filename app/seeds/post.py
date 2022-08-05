from app.models import db, Post


def seed_post():
  post1 = Post(
    user_id = 1, image='https://instashowbucket.s3.us-west-1.amazonaws.com/test-post-image.jpg', caption='Loved this Trip')
  post2 = Post(
    user_id = 2, image='https://instashowbucket.s3.us-west-1.amazonaws.com/demo-seed-image.jpg', caption="Such a cool trip, would love to go again sometime!")
  post3 = Post(
    user_id = 3, image='https://instashowbucket.s3.amazonaws.com/2c2131ff94d24ab58e5fddd7ad5c06dd.jpg', caption="Japan is beyond amazing...")
  post4 = Post(
    user_id = 1, image='https://instashowbucket.s3.amazonaws.com/9ded622d0eaf404b859bdd2d9694f7c4.jpg', caption='Getting some morning cuddles with my boy!')
  post5 = Post (
    user_id = 2, image='https://instashowbucket.s3.us-west-1.amazonaws.com/e43859cd7785054f275f3591557c5215.jpg', caption="Cool shot from this morning with the friends!")
  post6 = Post (
    user_id = 3, image='https://instashowbucket.s3.us-west-1.amazonaws.com/test-post5.jpg', caption="About to start the road trip with the boys, had to get this sweet shot before we headed out lol")

  db.session.add(post1)
  db.session.add(post2)
  db.session.add(post3)
  db.session.add(post4)
  db.session.add(post5)
  db.session.add(post6)

  db.session.commit()



def undo_post():
  db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
