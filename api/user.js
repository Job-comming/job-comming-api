const express = require('express');
const router = express.Router();
const { Users, UserCategories, Sequelize: { Op }, sequelize } = require("../src/db/models");
// const { Op } = require("sequelize");

router.get('/', (req, res, next) => {
    Users.findAll()
        .then((users) => {
            res.json(users);
        }).catch((err) => {
            console.log(err);
            next(err);
        });
})
router.get('/userid/:userid', (req, res) => {
    // if (!req.user)
    console.log('userid:', req.params.userid);
    Users.findAll({
        where: {
            userId: req.params.userid
        },
        limit: 1
    }).then((user) => {
        res.json(user);
    }).catch((err) => {
        res.send(err);
    });
})
router.get('/check', async (req, res) => {
    try {
        console.log('세션:', req.user);
        const user = await Users.findAll({
            where: {
                userId: req.user[0].googleId
            },
            limit: 1
        })
        console.log('유저:', user);
        if (user.length != 0) {
            res.sendFile(__dirname + '/mypage.html');
        } else {
            res.sendFile(__dirname + '/signup.html');
        }
    } catch (err) {
        console.log(err);
    }
})
router.post('/', async (req, res) => {
    const { userid, username, reputation, deposit, category1, level1, category2, level2 } = req.body;
    try {
        await sequelize.transaction(async (t) => {
            await Users.create({
                userId: userid,
                username: username,
                reputation: 0 || reputation,
                deposit: 0 || deposit,
            }, { transaction: t });
            await UserCategories.create({
                userId: userid,
                category: category1,
                level: level1
            }, { transaction: t });
            await UserCategories.create({
                userId: userid,
                category: category2,
                level: level2
            }, { transaction: t });
        });

        return res.send('User successfully added');
    } catch (err) {
        console.log(err);
    }
})

module.exports = router;