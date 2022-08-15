from app.models import  db, Comment

def seed_comments():
  comment_p1_1 = Comment(
    user_id = 2, post_id = 11, comment="Woooow, thats so awesome!! So Jelous!"
  )
  comment_p1_2 = Comment(
    user_id = 3, post_id = 11, comment=("Looks insane, take me with you next time!")
  )
  # -------------------------
  comment_p2_1 = Comment(
    user_id = 1, post_id = 16, comment=("I love how green it looks there, booking my flight now.")
  )
  comment_p2_2 = Comment(
    user_id = 3, post_id = 16, comment=("It almost looks fake thats how pretty it looks!")
  )
  # -------------------------
  comment_p3_1 = Comment(
    user_id = 1, post_id = 21, comment=("I've always wanted to go to japan, seeing this makes me want to go even more now")
  )
  # -------------------------
  comment_p4_1= Comment(
    user_id = 2, post_id = 25, comment=("Aww, cuddling with the big boy is never a bad move.")
  )
  # -------------------------
  comment_p5_1 = Comment(
    user_id = 3, post_id = 30, comment=("Totally rad shot, how were the waves today?")
  )
  comment_p5_2 = Comment(
    user_id = 2, post_id = 30, comment=('The waves were siiiick this morning, you should of came through!')
  )
  # -------------------------
  comment_p6_1 = Comment(
    user_id = 1, post_id = 32, comment=("Save travels amigo!")
  )

  db.session.add(comment_p1_1)
  db.session.add(comment_p1_2)
  db.session.add(comment_p2_1)
  db.session.add(comment_p2_2)
  db.session.add(comment_p3_1)
  db.session.add(comment_p4_1)
  db.session.add(comment_p5_1)
  db.session.add(comment_p5_2)
  db.session.add(comment_p6_1)

  db.session.commit()

def undo_comments():
  db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
