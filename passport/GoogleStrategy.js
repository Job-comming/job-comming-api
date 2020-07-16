const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { Auths } = require("../src/db/models");
require('dotenv').config();

module.exports = (passport) => {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://localhost:3000/auth/google/callback'
    }, async (accessToken, refreshToken, profile, cb) => {
        console.log('profile id:', profile.id);
        try {
            const user = await Auths.findAll({
                where: {
                    googleId: profile.id
                },
                limit: 1
            });
            if (user.length != 0) {
                return cb(null, user);
            } else {
                console.log('회원가입이 필요합니다.');
                const user = await Auths.create({
                    googleId: profile.id
                })
                return cb(null, user);
            }
        } catch (err) {
            console.log('ERROR:', err)
            return cb(err)
        }
    }));
}