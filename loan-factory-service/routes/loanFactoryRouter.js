const express = require('express')
const Joi = require('joi');
const axios = require('axios');
const router = express.Router();

const loanApplicationSchema = Joi.object({
  amount: Joi.number().integer().positive().max(100000).required(),
  maturity: Joi.number().integer().positive().min(3).max(60).required(),
  email: Joi.string().email().required()
});

/* POST /loans */
/*  calls user service to create  / get user
    scoring service to get approval
    installment plan calculator to create plan
    loans service to store the loan
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

const getOrCreateUser = (email) => {
  axios.get('http://consul.service.consul:8500/v1/catalog/service/user-service').then(response => {
    let address = response.data[0].ServiceAddress;
    let port = response.data[0].ServicePort;
    axios.get(`http://user-service.service.consul:${port}/users?email=${email}`).then(response => {
      if (response.data.users.length > 0) {
        return response.data.users[0];
      } else {
        axios.post(`http://user-service.service.consul:${port}/users`, {email: email, name: email}).then(response => {
          return response.data;
        })
      }
    })

  })
}

module.exports = router;
