const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');

// require User first, then passport. because passport uses User
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI);
const app = express();

//tell express to use cookieSession
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,   // cookie expires in 30days
    keys: [keys.cookieKey]
  })
);

// tell express to use passport cookie session
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
