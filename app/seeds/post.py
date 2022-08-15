from ..forms.edit_post import caption_len
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

# instashow
  post8 = Post (
    user_id = 10, image="https://instashowbucket.s3.us-west-1.amazonaws.com/instashow/51a11aa1a87ff441e0356abb31f5cfcc.jpg", caption="Welcome to Instashow!! The Developer worked long hours to get this to work, I hope you enjoy!😊"
  )
  post9 = Post (
    user_id = 10, image="https://instashowbucket.s3.us-west-1.amazonaws.com/instashow/instagram-engagement.jpg", caption="Instashow is an Instagram clone developed by Michael Dasch in collaboration with App Academy!"
  )
  post10 = Post (
    user_id = 10, image="https://instashowbucket.s3.us-west-1.amazonaws.com/instashow/How-to-make-money-on-Instagram.jpg", caption="Technologies used to build site include PostgreSQL, SQLAlchemy, Flask, Python, React, and Javascript."
  )
  post11= Post (
    user_id = 10, image="https://instashowbucket.s3.us-west-1.amazonaws.com/instashow/ec4a89c9a4dc81bbe2588db676a7165d.jpg", caption="A feature that will soon be added to Instashow will be adding emojis to creating posts/comments!"
  )
  post12 = Post (
    user_id = 10, image="https://instashowbucket.s3.us-west-1.amazonaws.com/instashow/247-instagram-answering-service.jpg", caption="Coming soon.....👀.....👀"
  )

# safariman
  post13 = Post (
    user_id= 7, image="https://instashowbucket.s3.us-west-1.amazonaws.com/safariman/1.jpg", caption="Such a cool shot from this mornings safari tour, such beautiful creatures! "
  )

  post14 = Post (
    user_id= 7, image="https://instashowbucket.s3.us-west-1.amazonaws.com/safariman/2.jpg", caption="Probably not my smartest idea getting this close, but the shot was 100% worth!"
  )

  post15 = Post (
    user_id= 7 , image="https://instashowbucket.s3.us-west-1.amazonaws.com/safariman/4.jpg", caption=" What a way to end the night off, while heading back saw a family of elephants!"
  )

  post16 = Post (
    user_id= 7 , image="https://instashowbucket.s3.us-west-1.amazonaws.com/safariman/5.jpg", caption="Look how close this big guy got to the lens! Was honestly worried for a sec"
  )

  post17 = Post (
    user_id= 7 , image="https://instashowbucket.s3.us-west-1.amazonaws.com/safariman/3.jpg", caption="Such an unbelievable shot on the last day of the safari... cannot believe we got this close"
  )

#nasa
  post18 = Post(
    user_id = 9, image="https://instashowbucket.s3.us-west-1.amazonaws.com/NASA/1.jpg", caption="Southern Ring Nebula - The bright star at the center of NGC 3132, while prominent when viewed by NASA’s Webb Telescope in near-infrared light."
  )

  post19 = Post(
    user_id = 9, image="https://instashowbucket.s3.us-west-1.amazonaws.com/NASA/2.jpg", caption="Instrested in topics some might consider to be impossible, come join the podcast to fulfill those fantasies. "
  )

  post20 = Post(
    user_id = 9, image="https://instashowbucket.s3.us-west-1.amazonaws.com/NASA/3.jpg", caption="Westerland 2 - A cluster of young stars – about one to two million years old – located about 20,000 light years from Earth. "
  )

  post21 = Post(
    user_id = 9, image="https://instashowbucket.s3.us-west-1.amazonaws.com/NASA/4.jpg", caption="Have you ever thought about what the surface of the moon might look like? Tune into the podcast to find out this Thursday! "
  )

  post22 = Post(
    user_id = 9, image="https://instashowbucket.s3.us-west-1.amazonaws.com/NASA/5.jpg", caption="Supernova Remnant - produced by a massive star that exploded in a nearby galaxy called the Small Magellanic "
  )

#Crunchyroll
  post23 = Post(
    user_id=8 , image="https://instashowbucket.s3.us-west-1.amazonaws.com/crunchyroll/crunchyroll.jpg", caption="We made it to Instashow!! 🎉"
  )

  post24 = Post(
    user_id=8 , image="https://instashowbucket.s3.us-west-1.amazonaws.com/crunchyroll/cQP_n7i1JuTdqBp0.jpg", caption="Do you remember this legendary day???"
  )

  post25 = Post(
    user_id=8 , image="https://instashowbucket.s3.us-west-1.amazonaws.com/crunchyroll/download.jpg", caption="Season 5 for My Hero Academia confirmed! Are you Ready??"
  )

  post26 = Post(
    user_id=8 , image="https://instashowbucket.s3.us-west-1.amazonaws.com/crunchyroll/50yw0pana5p81.jpg", caption="Happy Birthday to the GOAT Itadori Yuji!!"
  )

  post27 = Post(
    user_id=8 , image="https://instashowbucket.s3.us-west-1.amazonaws.com/crunchyroll/1.-Death-Note-Platinum-End.jpg", caption="Did you hear?? Platinum End will be streaming on Crunchyroll!"
  )

  post28 = Post(
    user_id=8 , image="https://instashowbucket.s3.us-west-1.amazonaws.com/crunchyroll/download.jpg", caption="Coming soon to Nintendo Switch..."
  )

#McDaschin

  post29 = Post(
    user_id = 4, image="https://instashowbucket.s3.us-west-1.amazonaws.com/McDaschin/image1+(2).jpeg", caption='"You can be my wingman anytime" - Maverick'
  )

  post30 = Post(
    user_id = 4, image="https://instashowbucket.s3.us-west-1.amazonaws.com/McDaschin/image3+(2).jpeg", caption='Had a great time this past weekend playing for the SDLC Lacrosse Team.'
  )

  post31 = Post(
    user_id = 4, image="https://instashowbucket.s3.us-west-1.amazonaws.com/McDaschin/image2+(2).jpeg", caption="What an insane view... Couldn't of made it to the top without Leo!"
  )

  post32 = Post(
    user_id = 4, image="https://instashowbucket.s3.us-west-1.amazonaws.com/McDaschin/IMG_1083+(2).JPG", caption="Getting ready to coach for another season of the SocalDevils Lacrosse team."
  )

#Digital Dasch
  post33 = Post(
    user_id = 5, image="https://instashowbucket.s3.us-west-1.amazonaws.com/0x0.jpg", caption="Just got done watching the Sandman on netflix... was so freaking good!!"
  )
  post35 = Post(
    user_id = 5, image="https://instashowbucket.s3.us-west-1.amazonaws.com/artwork-instashow.jpg", caption="Such cool art work me and my brother saw at the art Museum."
  )

#BrandofMel
  post34 = Post(
    user_id = 6, image="https://instashowbucket.s3.us-west-1.amazonaws.com/EsNorjfXYAY4t4V.jpg", caption="Just made it to Instashow, cant wait to see where this app goes from here!!"
  )
  post36 = Post(
    user_id = 6, image="https://instashowbucket.s3.us-west-1.amazonaws.com/dceb3e50fb7f388a9f9fa6c20346f913.jpg", caption="One of my fav pieces that I saw at the gallery this past weekend!"
  )







# instashow post
  db.session.add(post8)
  db.session.add(post9)
  db.session.add(post10)
  db.session.add(post11)
  db.session.add(post12)
  db.session.add(post34)
  db.session.add(post33)
  db.session.add(post35)
  db.session.add(post36)


  db.session.add(post13)
  db.session.add(post1)
  db.session.add(post18)
  db.session.add(post23)
  db.session.add(post29)

  db.session.add(post14)
  db.session.add(post2)
  db.session.add(post19)
  db.session.add(post24)
  db.session.add(post30)

  db.session.add(post15)
  db.session.add(post3)
  db.session.add(post20)
  db.session.add(post25)

  db.session.add(post16)
  db.session.add(post4)
  db.session.add(post22)
  db.session.add(post26)
  db.session.add(post31)

  db.session.add(post17)
  db.session.add(post5)
  db.session.add(post21)
  db.session.add(post6)
  db.session.add(post27)
  db.session.add(post32)
  db.session.add(post28)



  db.session.commit()



def undo_post():
  db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
