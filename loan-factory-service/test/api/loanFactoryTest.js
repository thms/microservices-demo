// During the test the env variable is set to test
process.env.NODE_ENV = 'test';
process.env.PORT = '3000';

// Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../app');
const should = chai.should();
const nock = require('nock');

var userServiceGet = nock('http://user-service:3000')
                      .get('/users?email=mike@example.com')
                      .reply(200, {
                        users: [{
                          id: 1,
                          name: 'mike',
                          email: 'mike@example.com'
                        }]
                      });

var loanServiceGet = nock('http://loan-service:3000')
                      .get('/loans?borrower_id=1')
                      .reply(200, {
                        loans: [{
                          id: 1,
                          borrower_id: 1,
                          amount: 1000,
                          interest_rate: 5,
                          maturity: 12

                        }]
                      });
var scoringServicePost = nock('http://scoring-service:3000')
                          .post('/scores', {
                            amount:5000,
                            user: {id:1,name:'mike',email:'mike@example.com'},loans:[{id:1,borrower_id:1,amount:1000,interest_rate:5,maturity:12}],approval:null,installmentPlan:null})
                          .reply(201, {
                            status: 'approved',
                            interest_rate: 6,
                            amount: 1000,
                            maturity: 12
                          });

let installmentPlanCalculatorPost = nock('http://installment-calculator-service:3000')
              .post('/installment-plans', {
                status: 'approved',
                interest_rate: 6,
                amount: 1000,
                maturity: 12
              })
              .reply(201, {
    "installments": [
        {
            "capital": 416.67,
            "interest": 16.67,
            "installment": 433.34000000000003,
            "remain": 4583.33,
            "interestSum": 16.67
        },
        {
            "capital": 416.67,
            "interest": 15.28,
            "installment": 431.95,
            "remain": 4166.66,
            "interestSum": 31.950000000000003
        },
        {
            "capital": 416.67,
            "interest": 13.89,
            "installment": 430.56,
            "remain": 3749.99,
            "interestSum": 45.84
        },
        {
            "capital": 416.67,
            "interest": 12.5,
            "installment": 429.17,
            "remain": 3333.3199999999997,
            "interestSum": 58.34
        },
        {
            "capital": 416.67,
            "interest": 11.11,
            "installment": 427.78000000000003,
            "remain": 2916.6499999999996,
            "interestSum": 69.45
        },
        {
            "capital": 416.67,
            "interest": 9.72,
            "installment": 426.39000000000004,
            "remain": 2499.98,
            "interestSum": 79.17
        },
        {
            "capital": 416.67,
            "interest": 8.33,
            "installment": 425,
            "remain": 2083.31,
            "interestSum": 87.5
        },
        {
            "capital": 416.67,
            "interest": 6.94,
            "installment": 423.61,
            "remain": 1666.6399999999999,
            "interestSum": 94.44
        },
        {
            "capital": 416.67,
            "interest": 5.56,
            "installment": 422.23,
            "remain": 1249.9699999999998,
            "interestSum": 100
        },
        {
            "capital": 416.67,
            "interest": 4.17,
            "installment": 420.84000000000003,
            "remain": 833.2999999999997,
            "interestSum": 104.17
        },
        {
            "capital": 416.67,
            "interest": 2.78,
            "installment": 419.45,
            "remain": 416.63000000000017,
            "interestSum": 106.95
        },
        {
            "capital": 416.67,
            "interest": 1.39,
            "installment": 418.06,
            "remain": 0,
            "interestSum": 108.34
        }
    ],
    "amount": 5000,
    "interestSum": 108.34,
    "capitalSum": 5000,
    "sum": 5108.34
})


let loanServicePost = nock('http://loan-service:3000')
  .post('/loans')
  .reply(201, {
    amount: 5000,
    interest_rate: 4,
    maturity: 12,
    created_at: new Date(),
    updated_at: null
  })



chai.use(chaiHttp);
// Our parent block
describe('Loan Factory', () => {
  /*
  * Happy path for scores
  */
  describe('POST /loans', () => {
    it('it should create loan and user when amount =< 10000', (done) => {
      chai.request(server)
        .post('/loans')
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
