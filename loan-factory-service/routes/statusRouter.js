const express = require('express');
const router = express.Router();
const tcpp = require('tcp-ping');

const dependencies = [
  'loan-service',
  'user-service',
  'scoring-service',
  'installment-calculator-service',
  'authentication-service'
]

let status = {};

const setStatus = (dependency, available) => {
  status[dependency] = available;
}

const checkDependencies = (dependencies) => {
  let promises = [];
  dependencies.forEach(function(dependency) {
    promises.push(new Promise((resolve, reject) => {
      tcpp.probe(dependency, 3000, function(err, available) {
        setStatus(dependency, available)
        resolve(available)
      })
    }))
  })
  return(promises)
}



router.get('/', function(req, res, next) {
  Promise.all(checkDependencies(dependencies)).then(() => 
  res.send({
    status: 'ok',
    service: 'loan-factory-service',
    version: '1.0.2',
    commit: '45ceea0def7b8e25f6ae4c24994f6b0897b5fcad',
    maintainer: 'mike@kreditech.com',
    gitrepo: 'https://github.com/KreditechSSL/loan-factory-service',
    uptime: process.uptime(),
    dependencies: status
  })
)
});

module.exports = router;
