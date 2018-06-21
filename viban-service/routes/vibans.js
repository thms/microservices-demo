var express = require('express');
var router = express.Router();

var db = require('../models/index');

/* GET vibans listing, optionally filtered by borrower_id. */
router.get('/', function(req, res, next) {
  let where = {};
  if (req.query.borrower_id) {
    where = {where: {borrower_id: req.query.borrower_id}};
  }
  db.viban.findAll(where).then(vibans => {
    res.send({vibans: vibans});
  });
});

/* GET vibans/:id */
router.get('/:id', function(req, res, next) {
  db.viban.findById(req.params.id).then(viban => {
    res.send(vibans);
  });
});

/* POST /vibans */
/* generates a new, unique one for a given loan_id */
router.post('/', function(req, res, next) {
  
})


module.exports = router;
