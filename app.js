const express = require('express');
require('dotenv').config();

const sequelize = require("./src/db/models");
const session = require('express-session')

// auth
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: '962457682682-rn95eivdba2v3ol1p1dvr5pantauli53.apps.googleusercontent.com',
    clientSecret: 'qEAGINdukAPKUpm13mOXZ6QL',
    callbackURL: 'http://localhost:3000/auth/google/callback'
},
    function (accessToken, refreshToken, profile, cb) {
        // sequelize.Auths.findOrCreate({ googleId: profile.id }, function (err, user) {
        //     return cb(err, user);
        // });
        console.log('id:', profile.id)
        sequelize.Auths.create({
            googleId: profile.id
        })
        return cb(null, profile);
    }
));
passport.serializeUser(function (user, done) {
    console.log(user);
    done(null, user);
});
passport.deserializeUser(function (obj, done) {
    done(null, obj);
});

const app = express();

// api
const apiUser = require("./api/user");
const apiPost = require("./api/post");
apiUser(app, sequelize);

app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));
app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
        // 회원가입용 세션을 생성하고 그 세션의 토큰을 클라이언트한테 보내주면되요

        res.json({ 'test': 'test' });
    }
)

// entry
const port = 3000
app.get('/', (req, res) => res.send('Hello World!~'));
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

module.exports = app;