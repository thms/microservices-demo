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
  // let response = await axios.get('http://consul:8500/v1/catalog/service/loan-service')
  // let address = response.data[0].ServiceAddress;
  // let port = response.data[0].ServicePort;
  let {address, port} = await getServiceAddressAndPort('loan-service');
  let loanData = {
    borrower_id: data.user.id,
    amount: data.approval.amount,
    interest_rate: data.approval.interest_rate,
    maturity: data.approval.maturity,
    product_id: 1
  }
  response = await axios.post(`http://loan-service:${port}/loans`, loanData, {
    headers: { Authorization: "Bearer " + accessToken }
  });
  return response.data
}

const getInstallmentPlan = async (approval) => {
  // let response = await axios.get('http://consul:8500/v1/catalog/service/installment-calculator-service')
  // let address = response.data[0].ServiceAddress;
  // let port = response.data[0].ServicePort;
  let {address, port} = await getServiceAddressAndPort('installment-calculator-service');
  response = await axios.post(`http://installment-calculator-service:${port}/installment-plans`, approval, {
    headers: { Authorization: "Bearer " + accessToken }
  });
  return response.data

}

const scoreLoan = async (data) => {
  // let response = await axios.get('http://consul:8500/v1/catalog/service/scoring-service')
  // let address = response.data[0].ServiceAddress;
  // let port = response.data[0].ServicePort;
  let {address, port} = await getServiceAddressAndPort('scoring-service');
  response = await axios.post(`http://scoring-service:${port}/scores`, data, {
    headers: { Authorization: "Bearer " + accessToken }
  });
  return response.data

}

const getLoansForUser = async (user) => {
  // let response = await axios.get('http://consul:8500/v1/catalog/service/loan-service')
  // let address = response.data[0].ServiceAddress;
  // let port = response.data[0].ServicePort;
  let {address, port} = await getServiceAddressAndPort('loan-service');
  response = await axios.get(`http://loan-service:${port}/loans?borrower_id=${user.id}`, {
    headers: { Authorization: "Bearer " + accessToken }
  });
  return response.data.loans
}

const getOrCreateUser = async (email) => {
  // let response = await axios.get('http://consul:8500/v1/catalog/service/user-service')
  // let address = response.data[0].ServiceAddress;
  // let port = response.data[0].ServicePort;
  let {address, port} = await getServiceAddressAndPort('user-service');
  response = await axios.get(`http://user-service:${port}/users?email=${email}`, {
    headers: { Authorization: "Bearer " + accessToken }
  });
  if (response.data.users.length > 0) {
    return response.data.users[0];
  } else {
    response = await axios.post(`http://user-service:${port}/users`, {email: email, name: email.split('@')[0]}, {
      headers: { Authorization: "Bearer " + accessToken }
    });
    return response.data
  }
}

const getServiceAddressAndPort = async (serviceName) => {
  if (process.env.CONSUL) {
    let response = await axios.get(`http://${process.env.CONSUL}:8500/v1/catalog/service/${serviceName}`)
    let address = response.data[0].ServiceAddress;
    let port = response.data[0].ServicePort;
    return { address: address, port: port };

  } else {
    return { address: serviceName, port: 3000 };
  }
}

module.exports = router;
