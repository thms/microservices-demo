// During the test the env variable is set to test
process.env.NODE_ENV = 'test';
process.env.PORT = '3000';

// Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');
const uuidv4 = require('uuid/v4')
const server = require('../../app');

const should = chai.should();

chai.use(chaiHttp);
// Our parent block
describe('Loans', () => {
  /*
  * Happy path for loans
  */
  let readToken = '';
  let writeToken = '';

  // create valid read token
  before(function () {
    readToken = jwt.sign({
      roles: ['service'],
      permissions: ['loan:read']
    },
      'secret',
    {
      issuer: 'authentication-service',
      subject: 'test-service',
      expiresIn: '1h',
      jwtid: uuidv4()
    });
    writeToken = jwt.sign({
      roles: ['service'],
      permissions: ['loan:write']
    },
      'secret',
    {
      issuer: 'authentication-service',
      subject: 'test-service',
      expiresIn: '1h',
      jwtid: uuidv4()
    });
  })

  describe('POST /loans', () => {
    it('it should create a loan with the correct permissions', (done) => {
      chai.request(server)
        .post('/loans')
        .set('Authorization', 'Bearer ' + writeToken)
        .send({borrower_id: 1, amount: 5000, maturity: 12, interest_rate: 6, product_id: 1})
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.amount.should.be.eq(5000);
          done();
        });
    });

    it('it should not create a loan without the correct permissions', (done) => {
      chai.request(server)
        .post('/loans')
        .set('Authorization', 'Bearer ' + readToken)
        .send({borrower_id: 1, amount: 5000, maturity: 12, interest_rate: 6, product_id: 1})
        .end((err, res) => {
          res.should.have.status(403);
          done();
        });
    });
  });

  describe('GET /loans', () => {
    it('it should read all loans with the correct permissions', (done) => {
      chai.request(server)
        .get('/loans')
        .set('Authorization', 'Bearer ' +readToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.loans.should.be.a('array');
          done();
        });
    });

    it('it should not read all loans without the correct permissions', (done) => {
      chai.request(server)
        .get('/loans')
        .set('Authorization', 'Bearer ' + writeToken)
        .end((err, res) => {
          res.should.have.status(403);
          done();
        });
    });
    it('it should not read all loans without a token', (done) => {
      chai.request(server)
        .get('/loans')
        .end((err, res) => {
          res.should.have.status(403);
          done();
        });
    });

  });

});
