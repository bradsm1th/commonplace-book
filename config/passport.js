const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
//Require your User Model here!
const UserModel = require('../models/user');

// configuring Passport! // Brad: "Use an instance of the GoogleStrat. class"
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK
},
  async function (accessToken, refreshToken, profile, cb) {
    // a user has logged in via OAuth!
    // refer to the lesson plan from earlier today in order to set this up
    console.log('=======profile from google========');
    console.log(profile);
    console.log('=======profile from google========');

    let user = await UserModel.findOne({ googleId: profile.id });

    // if user has already logged in before, send their doc back to Passport
    if (user) return cb(null, user);
    // if user doesn't exist in DB yet, create them
    try {
      user = await UserModel.create({
        name: profile.displayName,
        googleId: profile.id,
        email: profile.emails[0].value,
        avatar: profile.photos[0].value
      });
      // now that they exist, send back to Passport
      return cb(null, user)
    } catch (err) {
      cb(err)
    }
  })
);

passport.serializeUser(function (user, cb) {
  cb(null, user._id);
});

passport.deserializeUser(async function (id, cb) {

  // Find your User, using your model, and then call cb(err, whateverYourUserIsCalled)
  try {
    const userDoc = await UserModel.findById(id);
    // now set userDoc === to req.user so you can use it everywhere
    cb(null, userDoc);
  } catch (err) {
    cb(err)
  }
  // When you call this done function passport assigns the user document to req.user, which will 
  // be availible in every Single controller function, so you always know the logged in user

});



