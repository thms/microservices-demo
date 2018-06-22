const { Pact, Verifier } = require('@pact-foundation/pact');
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const bodyParser = require('body-parser').json();
chai.use(chaiHttp);


// turn around and test the provider against the pacts
describe('user-service', () => {
  const options = {
    providerBaseUrl: 'http://127.0.0.1:3000',
    provider: 'user-service',
    pactUrls: ['/Users/thomasboltze/code/demo-system/contract-testing/pacts/loan-factory-service-user-service.json']
  }
   it('should verify the contracts', function() {
     return new Verifier().verifyProvider(options).then(res => {
       console.log(res);
     })
   })
});
