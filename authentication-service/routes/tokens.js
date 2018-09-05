var express = require('express');
var router = express.Router();
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const uuidv4 = require('uuid/v4');

var db = require('../models/index');

const requestSchema =  Joi.object().keys({
  name: Joi.string().required(),
  secret: Joi.string().required()
})
/* POST /tokens */
/* name, secret  */
router.post('/', function(req, res, next) {
  if (Joi.validate(req.body, requestSchema).error === null) {
    db.service.findOne({where: {name: req.body.name, secret: req.body.secret}})
    .then(service => {
      var key = fs.readFileSync('./config/id_rsa.pem');
      var token = jwt.sign({
        roles: service.roles
      },
        key,
      {
        algorithm: 'RS256',
        issuer: 'authentication-service',
        subject: service.name,
        expiresIn: '1h',
        jwtid: uuidv4()
      });
      res.status(201);
      res.send({token: token});
    })
    .catch(err => {
      res.status(404)
      res.send({error: err})
    })
  } else {
    res.status(400)
    res.send({error: 'Validation failed'})
  }
})


module.exports = router;
