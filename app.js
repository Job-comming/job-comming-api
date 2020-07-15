const express = require('express');
const app = express();
require('dotenv').config();
const sequelize = require("./src/db/models");
const passport = require('passport');
const passportConfig = require("./passport");
const session = require('express-session');

// passport
passportConfig(passport);
app.use(
    session({
        name: 'jobcoming', // 쿠키에 저장될 세션키 이름
        secret: 'angelhack', // 세션 암호화를 위한 시크릿 
        resave: true, // 옵션 참고
        saveUninitialize: true, // 옵션 참고 
    })
);
app.use(passport.initialize());
app.use(passport.session());

// api
const apiUser = require("./api/user");
const apiPost = require("./api/post");
apiUser(app, sequelize);

app.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));
app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
        // 회원가입용 세션을 생성하고 그 세션의 토큰을 클라이언트한테 보내주면되요
        console.log(req.user);
        req.session['user'] = req.user;
        res.json({ 'accessToken': req.user.accessToken, 'user': req.user.user });
    }
)
app.get('/debug', (req, res) => {
    res.json({
        'req.session': req.session, // 세션 데이터
        'req.user': req.user, // 유저 데이터(뒷 부분에서 설명)
        'req._passport': req._passport, // 패스포트 데이터(뒷 부분에서 설명)
    })
});

// entry
const port = 3000
app.get('/', (req, res) => res.send('Hello World!~'));
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

module.exports = app;