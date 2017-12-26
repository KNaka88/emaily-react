const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');

const mongoose = require('mongoose');
const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);  //user.id is mongodb id, not gooleId
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null, user);
    });
});

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
  }, (accessToken, refreshToken, profile, done) => {

    // check if user exists
    User.findOne({ googleId: profile.id }).then( (existingUser) => {
      if (existingUser) {
        // user already exist
        done(null, existingUser);   // no error -> pass null as a first argument
      } else {
        // no user exist
        new User({ googleId: profile.id })  //create new instance of User mongoose
          .save() //save to database
          .then(user => done(null, user));
      }
    });

  })
);
