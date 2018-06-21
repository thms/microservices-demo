// During the test the env variable is set to test
process.env.NODE_ENV = 'test';
process.env.PORT = '3000';

// Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../app');

const should = chai.should();

chai.use(chaiHttp);
// Our parent block
describe('Loan Factory', () => {
  /*
  * Happy path for scores
  */
  describe('POST /loan-factory', () => {
    it('it should create and user when amount =< 10000', (done) => {
      chai.request(server)
        .post('/loan-factory')
        .send({amount: 5000, maturity: 12, email: 'mike@example.com'})
        .end((err, res) => {
          console.log(res.body)
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.amount.should.be.eq(5000);
          done();
        });
    });

  });
});
