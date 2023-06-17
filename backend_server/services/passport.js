const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const User = require('../models/userModel');

passport.serializeUser((user, done) => {
    done(null, user)
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

passport.use(new GoogleStrategy({
    clientID:keys.googleClientID,
    clientSecret:keys.googleClientSecret,
    callbackURL: keys.oauthCallbackURL // Route user will be sent back to after authentication.
},async (accessToken,refreshToken,profile,done) =>{ // This callback function runs when user is redirected to call back URL after authentication
    console.log(accessToken,'accessToken');
    console.log(profile,'profile');
    const [user, created] = await User.findOrCreate({
        where: {
            email: profile._json.email
        },
        defaults: {
            name: profile.displayName,
            profilePic: profile._json.picture
        }
    })
    console.log("user details", user);
    done(null, user);
}));