const router = require('express').Router();
const { User, Thing } = require('../db').models;


router.get('/users', (req, res, next) => {
  User.findAll({
	include: [ Thing ]
  }).then((users)=>res.send(users))
    .catch(next);
})

module.exports = router;
