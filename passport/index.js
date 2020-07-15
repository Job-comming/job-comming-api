const passport = require('passport');
const google = require('./GoogleStrategy');
const sequelize = require("../src/db/models");

module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        console.log(user.googleId)
        done(null, user.googleId);
    });
    passport.deserializeUser((obj, done) => {
        done(null, obj);
    });
    google(passport);
}