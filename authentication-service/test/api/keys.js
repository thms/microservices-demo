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
describe('Keys', () => {
  /*
  * Test the /GET route
  */
  describe('GET /public', () => {
    it('it should GET public key', (done) => {
      chai.request(server)
      .get('/keys/public')
      .end((err, res) => {
        res.should.have.status(200);
        console.log(res.body.public_key)
        res.body.public_key.should.be.a('string');
        done();
      });
    });
  });
});
