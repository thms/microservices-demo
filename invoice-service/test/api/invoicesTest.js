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
describe('Invoices', () => {
  /*
  * Happy path for invoices
  */
  let readToken = '';
  let writeToken = '';

  // create valid read token
  before(function () {
    readToken = jwt.sign({
      roles: ['service'],
      permissions: ['invoice:read']
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
      permissions: ['invoice:write']
    },
      'secret',
    {
      issuer: 'authentication-service',
      subject: 'test-service',
      expiresIn: '1h',
      jwtid: uuidv4()
    });
  })

  describe('POST /invoices', () => {
    it('it should create an invoice with the correct permissions', (done) => {
      chai.request(server)
        .post('/invoices')
        .set('Authorization', 'Bearer ' + writeToken)
        .send({user_id: 1,
          from: "thomas.boltze@gmail.com",
          client_name: "Jane Doe",
          invoiceNumber: "2020-001",
          invoiceDate: "2020-01-31",
          amount: 8900
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.amount.should.be.eq(8900);
          done();
        });
    });

    it('it should not create in invoice without the correct permissions', (done) => {
      chai.request(server)
        .post('/invoices')
        .set('Authorization', 'Bearer ' + readToken)
        .send({user_id: 1,
          from: "thomas.boltze@gmail.com",
          client_name: "Jane Doe",
          invoiceNumber: "2020-001",
          invoiceDate: "2020-01-31",
          amount: 8900
        })
        .end((err, res) => {
          res.should.have.status(403);
          done();
        });
    });
  });

  describe('GET /invoices', () => {
    it('it should read all invoices with the correct permissions', (done) => {
      chai.request(server)
        .get('/invoices')
        .set('Authorization', 'Bearer ' +readToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.invoies.should.be.a('array');
          done();
        });
    });

    it('it should not read any invoices without the correct permissions', (done) => {
      chai.request(server)
        .get('/invoices')
        .set('Authorization', 'Bearer ' + writeToken)
        .end((err, res) => {
          res.should.have.status(403);
          done();
        });
    });
    it('it should not read any invoices without a token', (done) => {
      chai.request(server)
        .get('/invoices')
        .end((err, res) => {
          res.should.have.status(403);
          done();
        });
    });

  });

});
