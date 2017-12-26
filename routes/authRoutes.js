const passport = require('passport');

module.exports = app => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']   //specifys asking Google permissions for profile and email
    })
  );

  // when google send back to callbackURL, pass to passport
  app.get('/auth/google/callback', passport.authenticate('google'));


  app.get('/api/current_user', (req, res) => {
    res.send(req.user); // this returns user info
  });

  app.get('/api/logout', (req, res) => {
    req.logout();  // tell passport logout and kills cookies
    res.send(req.user); // this should return empty
  });

};
