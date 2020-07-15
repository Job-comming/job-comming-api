const express = require('express');
const router = express.Router();
const { Users, Mentorings } = require("../src/db/models");

router.get('/', async (req, res) => {
    const users = await Users.findAll();
    res.json(users);
})

router.get('/:userid', async (req, res) => {
    console.log('userid:', req.params.userid);
    const user = await Users.findAll({
        where: {
            userid: req.params.userid
        }
    })
    res.json(user);
})

router.get('/:userid/:mentoring', async (req, res) => {
    console.log('userid:', req.params.userid);
    console.log('mentoring:', req.params.mentoring);
    const user = await Users.findAll({
        where: {
            userid: req.params.userid
        }
    })
    res.json(user);
})

module.exports = router;