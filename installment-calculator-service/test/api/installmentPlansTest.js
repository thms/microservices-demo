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
describe('Installment Plans', () => {
  /*
  * Happy path for installment Plans
  */
  describe('POST /', () => {
    it('it should return a new installment plan', (done) => {
      chai.request(server)
        .post('/installment-plans')
        .send({amount: 1000, maturity: 12, interest_rate:5})
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.amount.should.be.eq(1000);
          res.body.interestSum.should.be.eq(27.09);
          res.body.capitalSum.should.be.eq(1000);
          res.body.sum.should.be.eq(1027.09);
          res.body.installments.should.be.a('array');
          res.body.installments[0].capital.should.be.eq(83.33);
          res.body.installments[0].interest.should.be.eq(4.17);
          res.body.installments[0].installment.should.be.eq(87.5);
          res.body.installments[0].interest.should.be.eq(4.17);
          res.body.installments[0].remain.should.be.eq(916.67);
          res.body.installments[0].interestSum.should.be.eq(4.17);
          done();
        });
    });
  });

  /*
  * Unhappy path for installment Plans
  */
  describe('POST /', () => {
    it('it should return clear error message when parameters are missing', (done) => {
      chai.request(server)
        .post('/installment-plans')
        .send({amount: 1000, maturity: 12})
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.message.should.be.eq('"interest_rate" is required');
          done();
        });
    });
  });

});
