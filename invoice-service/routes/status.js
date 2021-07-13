var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.send({
    status: 'ok',
    service: 'invoice-service',
    version: '1.0.1',
    commit: '45ceea0def7b8e25f6ae4c24994f6b0897b5fcad',
    maintainer: 'mike@exmaple.com',
    gitrepo: 'https://github.com/thomas/invoice-service',
    uptime: process.uptime()
  });
});

module.exports = router;
