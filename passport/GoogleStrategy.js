const GoogleStrategy = require('passport-google-oauth20').Strategy;
const sequelize = require("../src/db/models");
require('dotenv').config();

module.exports = (passport) => {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://localhost:3000/auth/google/callback'
    }, async (accessToken, refreshToken, profile, cb) => {
        try {
            const user = await sequelize.Auths.findOne({ googleId: profile.id });
            if (user) {
                const googleUser = {
                    accessToken: accessToken,
                    user: profile
                }
                return cb(null, googleUser);
            } else {
                console.log('LOGIN NOT POSSIBLE');
            }
        } catch (err) {
            console.log('ERROR:', err)
            return cb(err)
        }
    }));
}