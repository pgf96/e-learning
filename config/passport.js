const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/user');

passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK
    },
    // the verify callback
    function(accessToken, refreshToken, profile, cb) {
        // opt 1) save a new user to our database
        // opt 2) find an existing user from our database
        // once the user is found/created - passport adds them to a new session (login to OUR site)
        // console.log(profile);
        User.findOne({googleId: profile.id}, function(err, user) {
            
            if(user) return cb(err, user);
            
            // when a function returns, it's execution ends
            User.create({
                name: profile.displayName,
                googleId: profile.id,
                email: profile.emails[0].value,
                avatar: profile.photos[0].value
            }, function(err, user) {
                return cb(err, user);
            });
        });
    }
));


passport.serializeUser(function(user, cb) {
  cb(null, user._id);
});

passport.deserializeUser(function(userId, cb) {
    User.findById(userId).then(function(user) {
      cb(null, user);
    });
  });
  

  