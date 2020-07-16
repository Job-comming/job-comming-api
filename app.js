const express = require('express');
const path = require('path');
const app = express();
const sequelize = require("./src/db/models");
const session = require('express-session');
const passport = require('passport');
const passportConfig = require("./passport");
require('dotenv').config();
passportConfig(passport);

app.set('port', process.env.PORT || 3000);

app.use(session({
    secret: process.env.COOKIE_SECRET, // 세션 암호화를 위한 시크릿키
    resave: true,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        secure: false
    }
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

// api
// const apiAuth = require("./api/auth");
// apiAuth(app, passport);
app.use('/', require('./api/auth'));
app.use('/api/user', require('./api/user'));
app.use('/api/post', require('./api/post'));

app.get('/loginFailure', (req, res) => {
    res.send('Login Failed! :(');
})

app.listen(app.get('port'), () => {
    console.log('Example app listening at', app.get('port'));
});

module.exports = app;