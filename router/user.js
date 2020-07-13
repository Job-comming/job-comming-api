const express = require('express');
const router = express.Router();
const db = require('./database/config');

// retrieve every users
router.get('/', (req, res) => {
	db.query("select id, username from user", (err, rows) => {
			if (!err) {
				return res.json(rows);
			} else {
				console.log(`query error : ${err}`);
				return res.status(400).json({error: "Retrieve Error"});
			}
		})
})

module.exports.user = router;