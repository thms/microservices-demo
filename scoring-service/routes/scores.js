const express = require('express')
const Joi = require('joi');
const router = express.Router();

const userSchema = Joi.object({
  email: Joi.string().email().required(),
  id: Joi.number().integer().positive().required(),
  name: Joi.string().required()
});

const loanApplicationSchema = Joi.object({
  amount: Joi.number().integer().positive().max(100000).required(),
  user: userSchema.required(),
  loans: Joi.array().items(Joi.any()).required()
});

/* POST /scores */
/* generates a new installment plan and returns it. does not store it */
router.post('/', function(req, res, next) {
  const validation = Joi.validate(req.body, loanApplicationSchema, {
    allowUnknown: true,
    abortEarly: true
  }).then(validation => {
    if (req.body.amount > 10000) {
      response = {
        status: 'rejected'
      }
    } else {
      response = {
        status: 'approved',
        interest_rate: 6,
        amount: req.body.amount,
        maturity: 12
      }
    }
    res.status(201);
    res.json(response);
    res.end();
  }).catch(error => {
    res.status(400);
    res.json(error.details[0]);
    res.end()
  })
});


module.exports = router;
