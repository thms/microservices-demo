// set global variables for testing with mocha
// this gets included in the application ServicePort
const jwt = require('jsonwebtoken');
const uuidv4 = require('uuid/v4');

const secret = 'testsecret'
var token = jwt.sign({
  roles: 'service',
  permissions: 'admin'
},
  secret,
{
  algorithm: 'HS256',
  issuer: 'authentication-service',
  subject: 'loan-factory-service',
  expiresIn: '1h',
  jwtid: uuidv4()
});

global.jwtSecret = 'secret'
global.accessToken = token
