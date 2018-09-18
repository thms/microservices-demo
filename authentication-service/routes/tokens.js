var express = require('express');
var router = express.Router();
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const uuidv4 = require('uuid/v4');

var db = require('../models/index');

// Implements client_credentials grant type of OAuth 2 with JWT as access token.
const requestSchema = Joi.alternatives().try(
  Joi.object().keys({
    grant_type: Joi.string().required(),
    client_id: Joi.string().required(),
    client_secret: Joi.string().required()
  }),
  Joi.object().keys({
    grant_type: Joi.string().required(),
    username: Joi.string().required(),
    password: Joi.string().required()
  })
)
/* POST /tokens */
/* name, secret  */
router.post('/', function(req, res, next) {
  if (Joi.validate(req.body, requestSchema).error === null) {
    if ('client_credentials' !== req.body.grant_type) {
      res.status(400);
      res.send({error: 'unsupported_grant_type'})
      return;
    }
    db.service.findOne({where: {name: req.body.client_id, secret: req.body.client_secret}})
    .then(service => {
      var key = fs.readFileSync('./config/id_rsa.pem');
      var token = jwt.sign({
        roles: service.roles,
        permissions: service.scopes
      },
        key,
      {
        algorithm: 'RS256',
        issuer: 'authentication-service',
        subject: service.name,
        expiresIn: '1h',
        jwtid: uuidv4()
      });
      res.status(200);
      res.send({
        token_type: 'Bearer',
        expires_in: 3600,
        access_token: token
      });
    })
    .catch(err => {
      res.status(401)
      res.send({error: 'invalid_client'})
    })
  } else {
    res.status(400)
    res.send({error: 'invalid_request'})
  }
})


module.exports = router;
