var express = require('express');
var router = express.Router();
var db = require('../models/index');



/* GET users listing. */
router.get('/', function(req, res, next) {
  db.user.findAll().then(users => {
    res.send({users: users});
  });
});


router.get('/:id', function(req, res, next) {
  db.user.findById(req.params.id).then(user => {
    res.send(user);
  });
});

module.exports = router;
