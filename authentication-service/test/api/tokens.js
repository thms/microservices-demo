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
      .send({grant_type: 'client_credentials', client_id: 'loan-service', client_secret: 'loan-secret'})
      .end((err, res) => {
        res.should.have.status(200);
        res.body.expires_in.should.eq(3600);
        res.body.token_type.should.be.eq('Bearer');
        res.body.access_token.should.be.a('string');
        let public_key = fs.readFileSync('./config/id_rsa.pub.pem')
        let decoded = jwt.verify(res.body.access_token, public_key);
        decoded.roles.should.deep.eq(['service'])
        decoded.sub.should.eq('loan-service')
        decoded.iss.should.eq('authentication-service')
        done();
      });
    });


    it('it should not get a token for a valid service with wrong secret', (done) => {
      chai.request(server)
      .post('/tokens')
      .send({grant_type: 'client_credentials', client_id: 'loan-service', client_secret: 'wrong-secret'})
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
    });

    it('it should not get a token for a non-existing service', (done) => {
      chai.request(server)
      .post('/tokens')
      .send({grant_type: 'client_credentials', client_id: 'non-existing-service', client_secret: 'some-secret'})
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
    });

    it('it should not get a token for an unsupported grant type', (done) => {
      chai.request(server)
      .post('/tokens')
      .send({grant_type: 'password', username: 'some-user', password: 'some-secret'})
      .end((err, res) => {
        res.should.have.status(400);
        res.body.error.should.eq('unsupported_grant_type')
        done();
      });
    });

    it('it should gracefully handle invalid requests', (done) => {
      chai.request(server)
      .post('/tokens')
      .send({some: 'some', stuff: 'stuff'})
      .end((err, res) => {
        res.should.have.status(400);
        res.body.error.should.eq('invalid_request')
        done();
      });
    });

  });
});
