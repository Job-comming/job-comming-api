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

app.use(
    session({
        name: 'jobcoming', // 쿠키에 저장될 세션키 이름
        secret: process.env.COOKIE_SECRET, // 세션 암호화를 위한 시크릿 
        resave: true,
        saveUninitialize: true,
    })
);
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());

// api (다른파일로 옮기기)
const apiAuth = require("./api/auth");
apiAuth(app, passport);
// app.use('/', require('/api/index'));
app.use('/api/user', require('./api/user'));
app.use('/post', require('/api/post'));

app.get('/loginFailure', (req, res) => {
    res.send('Login Failed! :(');
})

app.listen(app.get('port'), () => {
    console.log('Example app listening at', app.get('port'));
});

module.exports = app;