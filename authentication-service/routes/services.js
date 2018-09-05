var express = require('express');
var router = express.Router();
const Joi = require('joi');

var db = require('../models/index');

const serviceSchema =  Joi.object().keys({
  name: Joi.string().required(),
  secret: Joi.string().required(),
  token: Joi.string(),
  roles: Joi.array().required()
})
/* GET service listing. */
router.get('/', function(req, res, next) {
  db.service.findAll().then(services => {
    res.send({services: services});
  });
});

/* POST /services */
/* name, secret, roles */
router.post('/', function(req, res, next) {
  if (Joi.validate(req.body, serviceSchema).error === null) {
    db.service.create(req.body, {silent: true}).then(service => {
      res.status(201);
      res.send(service)
    })
  } else {
    res.status(400)
    res.send({error: 'something went microsoft'})
  }
})


module.exports = router;
