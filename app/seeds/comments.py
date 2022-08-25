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

  comment1 = Comment(
    user_id = 4, post_id = 1, comment="Took many sleepless nights to get this running, hope you enjoy!"
  )
  comment2 = Comment(
    user_id = 4, post_id = 2, comment="Tried to make it as pixel perfect, can still use some work though."
  )
  comment3 = Comment(
    user_id = 4, post_id = 3, comment="First solo project using Flask and python for handling the backend."
  )
  comment4 = Comment(
    user_id = 4, post_id = 4, comment="Working on this as we speak.... should be coming soon!"
  )
  comment5 = Comment(
    user_id = 4, post_id = 5, comment="Might take some time to get this running but it is something I'm looking to implement."
  )

  comment6 = Comment(
    user_id = 2, post_id = 1, comment="Super pumped to be here! Can't wait to see where this application goes from here 😊"
  )
  comment7 = Comment(
    user_id = 1, post_id = 1, comment="Cool app so far, impressive that one person built all this!"
  )
  comment8 = Comment(
    user_id = 9, post_id = 2, comment="I can see the similarites forsure, this is a pretty cool app!"
  )
  comment9 = Comment(
    user_id = 1, post_id = 2, comment="After using instagram alot, this is pretty easy to use.🤔"
  )
  comment10 = Comment(
    user_id = 5, post_id = 3, comment="They should call you Digital Dasch"
  )
  comment11 = Comment(
    user_id = 7, post_id = 4, comment="I see we can use the emojis now!!! 😄🕺🏽"
  )
  comment12 = Comment(
    user_id = 1, post_id = 4, comment="Oooooo love me some emojiiiiss"
  )
  comment13 = Comment(
    user_id = 2, post_id = 5, comment="Sheeesh seems like this is gonna be hard... Good luck!"
  )
  comment14 = Comment(
    user_id = 1, post_id = 5, comment="Looking forward to this 👀"
  )

  comment15 = Comment(
    user_id = 10, post_id = 6, comment="Welcome to Instashow!! We're happy to have you 😊"
  )

  comment16 = Comment(
    user_id = 10, post_id = 7, comment="Oooo just finished this too... was sooo good!"
  )

  comment17 = Comment(
    user_id = 10, post_id = 10, comment="Oh my goodness! Such an awesome shot 🤯"
  )

  comment18 = Comment(
    user_id = 4, post_id = 10, comment="Man im so jelous... please take me with you next time!"
  )

  comment19 = Comment(
    user_id = 10, post_id = 13, comment="You don't understand how excited I am about this "
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
  db.session.add(comment1)
  db.session.add(comment2)
  db.session.add(comment3)
  db.session.add(comment4)
  db.session.add(comment5)
  db.session.add(comment6)
  db.session.add(comment7)
  db.session.add(comment8)
  db.session.add(comment9)
  db.session.add(comment10)
  db.session.add(comment11)
  db.session.add(comment12)
  db.session.add(comment13)
  db.session.add(comment14)
  db.session.add(comment15)
  db.session.add(comment16)
  db.session.add(comment17)
  db.session.add(comment18)
  db.session.add(comment19)


  db.session.commit()

def undo_comments():
  db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
