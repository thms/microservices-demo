//const pact = require('@pact-foundation/pact-node');
const { Pact, Verifier } = require('@pact-foundation/pact');
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const bodyParser = require('body-parser').json();
chai.use(chaiHttp);


// run with mocha test.js
// does not persist the contracts in the directory yet
// somehow the pact-node stuff is not understandable yet

// open questions: how

describe('loan-factory', () =>{
  // pact server:
  const url = 'http://127.0.0.1';
  const port = 9999;

  // create the server that will record the tests between loan factory and user service
  const provider = new Pact({
    port: port,
    dir: './pacts',
    spec: 2,
    consumer: 'loan-factory-service',
    provider: 'user-service',
    pactfileWriteMode: 'merge' // note the bad spelling, it is intentional, the code is buggy
  });

  // const EXPECTED_BODY = {
  //   email: 'mike@example.com',
  //   id: 1,
  //   name: 'mike'
  // };
  const EXPECTED_BODY = {
    "users": [
        {
            "id": 1,
            "name": "mike",
            "email": "mike@example.com",
            "created_at": "2018-06-21T16:35:01.000Z",
            "updated_at": null
        }
    ]
  };

  before(() => provider.setup());
  after(() => provider.finalize());

  describe('get user by email', () => {
    before(done => {
      let interaction = {
        state: "There is a user with email mike@example.com",
        uponReceiving: 'a request to find user by email',
        withRequest: {
          method: 'GET',
          path: '/users',
          query: 'email=mike@example.com',
          headers: { 'Accept': 'application/json'}
        },
        willRespondWith: {
          status: 200,
          headers:{ 'Content-Type': 'application/json; charset=utf-8' },
          body: EXPECTED_BODY
        }
      };
      provider.addInteraction(interaction).then(() => {
        done();
      })
    })

    // this is simplistic, should really test the function that embedded in the code I am testing
    it('returns the user' , done => {
      chai.request('http://127.0.0.1:9999')
        .get('/users?email=mike@example.com')
        .set('Accept', 'application/json')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.deep.eq(EXPECTED_BODY)
          done();
        });
    });

    // provider.verify compares the output of the actual provider service
    // with the output defined by the contract, yes? yes, but not here since we cannot set the providerBaseUrl
    afterEach(() => provider.verify())
  });
});
