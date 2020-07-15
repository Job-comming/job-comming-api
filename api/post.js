// module.exports = (app, models) => {
//     app.get('/posts', (req, res) => {
//         models.Posts.findAll().then((result) => res.json(result))
//     })
// }


const express = require('express');
const router = express.Router();
const { Posts } = require("../src/db/models");

router.get('/', async (req, res) => {
    const posts = await Posts.findAll();
    res.json(posts);
})

router.get('/:id', async (req, res) => {
    console.log('id:', req.params.userid);
    const post = await Posts.findAll({
        where: {
            id: req.params.id
        }
    })
    res.json(post);
})

module.exports = router;