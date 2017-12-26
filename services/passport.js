const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');

const mongoose = require('mongoose');
const User = mongoose.model('users');

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
  }, (accessToken, refreshToken, profile, done) => {

    // check if user exists
    User.findOne({ googleId: profile.id })
      .then( (existingUser) => {
        if (existingUser) {
          // user already exist
          
        } else {
          // no user exist
          new User({ googleId: profile.id }).save();  //create new instance of User mongoose and save
        }
      })


  })
);