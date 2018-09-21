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
/* borrower_id, amount, product_id, maturity, interest_rate */
/* TODO: figure out why I need to reload the loan to get the timestamps' values to be correct */
/* without they are the { created_at: { val: 'CURRENT_TIMESTAMP(3)' },
  updated_at: { val: 'NULL' },
*/
router.post('/', function(req, res, next) {
  db.loan.create(req.body, {silent: false}).then(loan => {
    db.loan.findById(loan.id).then(loan => {
      res.status(201);
      res.json(loan);
      res.end();
    })
  })
})


module.exports = router;
