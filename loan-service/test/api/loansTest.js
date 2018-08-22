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
describe('Loans', () => {
  /*
  * Happy path for loans
  */
  describe('POST /loans', () => {
    it('it should create a loan', (done) => {
      chai.request(server)
        .post('/loans')
        .send({borrower_id: 1, amount: 5000, maturity: 12, interest_rate: 6, product_id: 1})
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
