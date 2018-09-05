// During the test the env variable is set to test
process.env.NODE_ENV = 'test';
process.env.PORT = '3000';

// Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const server = require('../../app');

const should = chai.should();

chai.use(chaiHttp);
// Our parent block
describe('Tokens', () => {

  describe('POST /tokens', () => {
    it('it should get a token for a valid service', (done) => {
      chai.request(server)
      .post('/tokens')
      .send({name: 'loan-service', secret: 'loan-secret'})
      .end((err, res) => {
        res.should.have.status(201);
        res.body.token.should.be.a('string');
        let public_key = fs.readFileSync('./config/id_rsa.pub.pem')
        let decoded = jwt.verify(res.body.token, public_key);
        decoded.roles.should.deep.eq(['service'])
        decoded.sub.should.eq('loan-service')
        decoded.iss.should.eq('authentication-service')
        done();
      });
    });


    it('it should not get a token for a valid service with wrong secret', (done) => {
      chai.request(server)
      .post('/tokens')
      .send({name: 'loan-service', secret: 'wrong-secret'})
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
    });

    it('it should not get a token for a non-existing service', (done) => {
      chai.request(server)
      .post('/tokens')
      .send({name: 'non-existing-service', secret: 'some-secret'})
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
    });
  });
});
