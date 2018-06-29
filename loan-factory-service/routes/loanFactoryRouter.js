const express = require('express')
const Joi = require('joi');
const router = express.Router();

const loanApplicationSchema = Joi.object({
  amount: Joi.number().integer().positive().max(100000).required(),
  maturity: Joi.number().integer().positive().min(3).max(60).required(),
  email: Joi.string().email().required()
});

/* POST /loans */
/*  calls user service to create  / get user
    scoring service to get aproval
    installment plan calculator to create plan
    loans service to store the loans
*/
router.post('/', function(req, res, next) {
  const validation = Joi.validate(req.body, loanApplicationSchema, {
    allowUnknown: false,
    abortEarly: true
  }).then(validation => {
    // get or create the
    res.status(201);
    res.json({amount: req.body.amount});
    res.end();
  }).catch(error => {
    res.status(400);
    res.json(error.details[0]);
    res.end()
  })
});


module.exports = router;
