const express = require('express')
const LoanJS = require('loanjs');
const Joi = require('joi');
const router = express.Router();


const installmentPlanParamsSchema = Joi.object({
  amount: Joi.number().integer().positive().max(10000).required(),
  maturity: Joi.number().integer().positive().min(3).max(60).required(),
  interest_rate: Joi.number().integer().positive().min(0).max(100).required()
});

/* POST /installment-plans */
/* generates a new installment plan and returns it. does not store it */
router.post('/', function(req, res, next) {
  const validation = Joi.validate(req.body, installmentPlanParamsSchema, {
  // return an error if body has an unrecognised property
    allowUnknown: true,
    // return only first error a payload contains
    abortEarly: true
  });

  if (validation.error) {
    console.log(validation.error)
    res.status(400);
    res.json(validation.error.details[0]);
  } else {
    let installmentPlan = new LoanJS.Loan(
      req.body.amount, // amount
      req.body.maturity,   // installments number in months
      req.body.interest_rate,    // interest rate in percent
      true  // diminishing ??
    );
    res.status(201);
    res.json(installmentPlan);
  }
});


module.exports = router;
