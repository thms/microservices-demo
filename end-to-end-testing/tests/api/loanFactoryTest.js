// Require the dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

chai.use(chaiHttp);
// Our parent block
describe('Loan Factory', () => {
  /*
  * Happy path for scores
  */
  describe('POST /loans', () => {
    it('it should create loan and user when amount =< 10000', (done) => {
      //chai.request('http://loan-factory-service:3000')
      chai.request('http://localhost:8080')
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
