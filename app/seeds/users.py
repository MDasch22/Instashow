import email
from re import fullmatch
from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password', fullname='Demo User', bio="I am the Demo User", profile_pic='https://instashowbucket.s3.us-west-1.amazonaws.com/default-profile-icon-24.jpg')
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password', fullname='Marnie Smith', bio="I am Marnie Smith", profile_pic='https://instashowbucket.s3.us-west-1.amazonaws.com/4dbd4ef54d2f41cd9f9b5b0c43d8bc6c.jpg')
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password', fullname="Bobbie Duggin", bio="I am Bobby Duggin", profile_pic='https://instashowbucket.s3.us-west-1.amazonaws.com/88985.png' )
    michael = User(
        username='McDaschin', email="michaeldasch22@gmail.com", password="password!!", fullname="Michael Dasch", bio="I am Michael Dasch", profile_pic="https://instashowbucket.s3.us-west-1.amazonaws.com/coaching.jpeg"
    )
    shawn = User(
        username="DigitalDasch", email="shawndasch11@gmail.com", password="password", fullname="Shawn Dasch", bio="I am Shawn Dasch", profile_pic="https://instashowbucket.s3.us-west-1.amazonaws.com/tanjiro+wallpaper.jpg"
    )
    joshua = User(
        username="BrandofMel", email="joshuadasch@gmail.com", password="password", fullname="Joshua Dasch", bio="I am Joshua Dasch", profile_pic="https://instashowbucket.s3.us-west-1.amazonaws.com/99bbf1fc914ad9fcaea4c7a10fffabe9.png"
    )
    safari = User(
        username='theSafariMan', email="safariman@gmail.com", password="password", fullname="Andrew Bolt", bio="Excited to share my 🦁 safari 🦁 pictures with the world, hope you enjoy just as much as I do 📷", profile_pic="https://instashowbucket.s3.us-west-1.amazonaws.com/71153223_2363633983734725_7786436035864428544_n.jpg"
    )
    crunchy = User(
        username='Crunchyroll', email="crunchyroll@gmail.com", password="password", fullname="Crunchyroll", bio="✨ Welcome to Crunchyroll! ✨ Bringing you all the latest & greatest anime at the speed of Japan ~ !", profile_pic="https://instashowbucket.s3.us-west-1.amazonaws.com/crunchyroll.jpg"
    )
    nasa = User(
        username='nasa', email="nasanasa@gmail.com", password="passwordNasa", fullname="NASA", bio="🚀 🌎 Exploring the universe and our home planet.", profile_pic="https://instashowbucket.s3.us-west-1.amazonaws.com/images.png"
    )
    instashow = User(
        username = "instashow", email="instashow@gmail.com", password="passwordInstashow", fullname="Instashow", bio=" Discover what's next on Instashow 🔎✨", profile_pic="https://instashowbucket.s3.us-west-1.amazonaws.com/instashow-fav.png"
    )



    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(michael)
    db.session.add(shawn)
    db.session.add(joshua)
    db.session.add(safari)
    db.session.add(crunchy)
    db.session.add(nasa)
    db.session.add(instashow)





    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
