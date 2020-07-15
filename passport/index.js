const passport = require('passport');
const google = require('./GoogleStrategy');
const sequelize = require("../src/db/models");

module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        console.log(user.user.id)
        done(null, user.user.id);
    });
    passport.deserializeUser((obj, done) => {
        done(null, obj);
    });
    google(passport);
}