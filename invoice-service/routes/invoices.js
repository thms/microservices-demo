var express = require('express');
var router = express.Router();
const guard = require('express-jwt-permissions')()

var db = require('../models/index');

/* GET invoices listing, optionally filtered by user_id. */
router.get('/', guard.check('invoice:read'), function(req, res, next) {
  let where = {};
  if (req.query.user_id) {
    where = {where: {user_id: req.query.user_id}};
  }
  db.invoice.findAll(where).then(invoices => {
    res.send({invoices: invoices});
  });
});

/* GET invoices/:id */
router.get('/:id', guard.check('invoice:read'), function(req, res, next) {
  db.invoice.findById(req.params.id).then(invoice => {
    res.send(invoice);
  });
});

/* POST /invoices */
/* user_id, amount, from, client_name, invoice_number, invoice_date,  */
/* TODO: figure out why I need to reload the invoice to get the timestamps' values to be correct */
/* without they are the { created_at: { val: 'CURRENT_TIMESTAMP(3)' },
  updated_at: { val: 'NULL' },
*/
router.post('/', guard.check('invoice:write'), function(req, res, next) {
  db.invoice.create(req.body, {silent: false}).then(invoice => {
    db.invoice.findById(invoice.id).then(invoice => {
      res.status(201);
      res.json(invoice);
      res.end();
    })
  })
})


module.exports = router;
