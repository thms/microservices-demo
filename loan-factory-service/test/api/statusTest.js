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
describe('Status', () => {
  /*
  * Test the /GET route
  */
  describe('GET /', () => {
    it('it should GET status / healthcheck', (done) => {
      chai.request(server)
        .get('/')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.status.should.be.eq('ok');
          res.body.service.should.be.eq('loan-factory-service');
          done();
        });
    });
  });
});
