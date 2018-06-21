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
describe('Scorings', () => {
  /*
  * Happy path for scores
  */
  describe('POST /scores', () => {
    it('it should approve loan when amount =< 10000', (done) => {
      chai.request(server)
        .post('/scores')
        .send({amount: 1000, user: {email: 'mike@example.com', id: 1}, loans: []})
        .end((err, res) => {
          console.log(res.body)
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.amount.should.be.eq(50000);
          res.body.status.should.be.eq('approved');
          res.body.interest_rate.should.be.eq(6);
          done();
        });
    });

    it('it should reject loan when amount > 10000', (done) => {
      chai.request(server)
        .post('/scores')
        .send({amount: 10001, user: {email: 'mike@example.com', id: 1}, loans: []})
        .end((err, res) => {
          console.log(res.body)
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.status.should.be.eq('rejected');
          done();
        });
    });
  });

  /*
  * Unhappy path for installment Plans
  */
  describe('POST /scores', () => {
    it('it should return clear error message when user is missing', (done) => {
      chai.request(server)
        .post('/scores')
        .send({amount: 1000, loans: []})
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.message.should.be.eq('"user" is required');
          done();
        });
    });

    it('it should return clear error message when loans is missing', (done) => {
      chai.request(server)
        .post('/scores')
        .send({amount: 1000, user: {email: 'mike@example.com', id: 1}})
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.message.should.be.eq('"loans" is required');
          done();
        });
    });

  it('it should return clear error message when amount validation fails', (done) => {
    chai.request(server)
      .post('/scores')
      .send({amount: 100001, user: {email: 'mike@example.com', id: 1}, loans: []})
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.message.should.be.eq('"amount" must be less than or equal to 100000');
        done();
      });
  });
});

});
