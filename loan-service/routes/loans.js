var express = require('express');
var router = express.Router();

var db = require('../models/index');

/* GET loans listing, optionally filtered by borrower_id. */
router.get('/', function(req, res, next) {
  let where = {};
  if (req.query.borrower_id) {
    where = {where: {borrower_id: req.query.borrower_id}};
  }
  db.loan.findAll(where).then(loans => {
    res.send({loans: loans});
  });
});

/* GET loans/:id */
router.get('/:id', function(req, res, next) {
  db.loan.findById(req.params.id).then(loan => {
    res.send(loan);
  });
});

/* POST /loans */
/* borrower_id, aount, product_id, maturity, interest_rate */
router.post('/', function(req, res, next) {
  db.loan.create(req.body, {silent: true}).then(loan => {
    res.status(201);
    res.json(loan);
    res.end();
  })
})


module.exports = router;
