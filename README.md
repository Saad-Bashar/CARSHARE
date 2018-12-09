# CARSHARE

First of all, a great weekend building this app ;) Hope I fulfill the app requirements. I am going to list down what I have done in the app.

## Install and Run
I built the app using **Expo** (Why? I will tell the reason later in this readme). So it is very easy to run the app. All you need is Expo Client in your mobile and scan the QRCODE to run the app. 

**Expo Link for the demo project** - [Demo](https://expo.io/@saad-bashar/SOCAR)


## What I have done
I will list down the screens and write briefly about the main functionalities of them

### Splash Screen 

Added a very simple splash screen with SOCAR logo. 

![Splash](https://github.com/Saad-Bashar/CARSHARE/blob/master/assets/screenshots/splash.png)


### Home Screen

1. Added a map with different custom markers
2. Marker onhover more info

![Map](https://github.com/Saad-Bashar/CARSHARE/blob/master/assets/screenshots/map.png)

### Car List Screen

1. Showing all the cars in the list
2. Swipe car item right to reserve or swipe left to see next car.

<a href="https://imgflip.com/gif/2ojbgq"><img src="https://i.imgflip.com/2ojbgq.gif" title="made at imgflip.com"/></a>

### Reservation Form

1. Google place input to fill up location
2. Date and hours to reserve a car
3. functionality to reseve a car

![Form](https://github.com/Saad-Bashar/CARSHARE/blob/master/assets/screenshots/form.png)

### Active & Complete Reservations List

1. Active and complete reservation list in 2 separate tabs.
2. Functionality to mark active data to complete.

![Active](https://github.com/Saad-Bashar/CARSHARE/blob/master/assets/screenshots/list.png)
![Complete](https://github.com/Saad-Bashar/CARSHARE/blob/master/assets/screenshots/list2.png)

### Profile Page

1. Dummy profile page

![Profile](https://github.com/Saad-Bashar/CARSHARE/blob/master/assets/screenshots/profile.png)

### About page

1. Auto Carousel list to show **"Why SOCAR"**
2. Collapsible list to show **FAQ**

![about](https://github.com/Saad-Bashar/CARSHARE/blob/master/assets/screenshots/about.png)

### What I have not done

Since the requirements were to just create a car reservation system, I did not do the user authentication. So right now assuming that the app does not have any user for the demo purpose.

### Few mentionable points:

1.I used react-redux-firebase so the app's redux store is automatically connected to the firebase. So I do not manually need to call any redux actions to dispatch to firebase

2.Even though expo is not really a good choice for production level app, but in order to make a demo for this test this has been the best option since it can bootstap the app real quick.

### My Limitations: 
Even though I have been given 5 days for this test, I had to finish it within this 2 days during the weekends since from next week I have my Master's final exams coming! So the animation might be a little buggy in real devices specially on android. But overall really enjoyed working on this.

