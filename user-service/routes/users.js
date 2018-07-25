var express = require('express');
var router = express.Router();
var db = require('../models/index');



/* GET users listing. */
router.get('/', function(req, res, next) {
  let where = {};
  if (req.query.email) {
    where = {where: {email: req.query.email}};
  }
  db.user.findAll(where).then(users => {
    res.send({users: users});
  });
});


router.get('/:id', function(req, res, next) {
  db.user.findById(req.params.id).then(user => {
    res.send(user);
  });
});

router.post('/', function(req, res, next) {
  console.log(req.body)
  db.user.create(req.body, {silent: true}).then(user => {
    res.json(user);
    res.end()
  })})

module.exports = router;
