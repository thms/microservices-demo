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
  let data = {amount: null, user: null, loans: [], approval: null, installmentPlan: null}
  const validation = Joi.validate(req.body, loanApplicationSchema, {
    allowUnknown: false,
    abortEarly: true
  }).then(validation => {
    // get or create the user
    getOrCreateUser(req.body.email)
    .then(user => {
      data.user = user;
      // get loans for the user
      return getLoansForUser(user)
    })
    .then(loans => {
      data.loans = loans
      data.amount = req.body.amount
      // score the loan
      return(scoreLoan(data))
    })
    .then(approval => {
      data.approval = approval
      // get installment plan
      return getInstallmentPlan(data.approval)
    })
    .then(installmentPlan => {
      data.installmentPlan = installmentPlan
      res.status(201)
      res.json(data)
      res.end()
      return createLoan(data)
    })
    .then(data => {
      res.status(201)
      res.json(data)
      res.end()
    })
  }).catch(error => {
    console.log(error)
    res.status(400);
    res.json(error.details[0]);
    res.end()
  })
});

const createLoan = async (data) => {
  let response = await axios.get('http://consul.service.consul:8500/v1/catalog/service/loan-service')
  let address = response.data[0].ServiceAddress;
  let port = response.data[0].ServicePort;
  response = await axios.post(`http://loan-service.service.consul:${port}/loans`, data);
  return response.data
}

const getInstallmentPlan = async (approval) => {
  let response = await axios.get('http://consul.service.consul:8500/v1/catalog/service/installment-calculator-service')
  let address = response.data[0].ServiceAddress;
  let port = response.data[0].ServicePort;
  response = await axios.post(`http://installment-calculator-service.service.consul:${port}/installment-plans`, approval);
  return response.data

}

const scoreLoan = async (data) => {
  let response = await axios.get('http://consul.service.consul:8500/v1/catalog/service/scoring-service')
  let address = response.data[0].ServiceAddress;
  let port = response.data[0].ServicePort;
  response = await axios.post(`http://scoring-service.service.consul:${port}/scores`, data);
  return response.data

}

const getLoansForUser = async (user) => {
  let response = await axios.get('http://consul.service.consul:8500/v1/catalog/service/loan-service')
  let address = response.data[0].ServiceAddress;
  let port = response.data[0].ServicePort;
  response = await axios.get(`http://loan-service.service.consul:${port}/loans?borrower_id=${user.id}`);
  return response.data.loans
}

const getOrCreateUser = async (email) => {
  let response = await axios.get('http://consul.service.consul:8500/v1/catalog/service/user-service')
  let address = response.data[0].ServiceAddress;
  let port = response.data[0].ServicePort;
  response = await axios.get(`http://user-service.service.consul:${port}/users?email=${email}`);
  if (response.data.users.length > 0) {
    return response.data.users[0];
  } else {
    response = await axios.post(`http://user-service.service.consul:${port}/users`, {email: email, name: email.split('@')[0]});
    return response.data
  }
}



module.exports = router;
