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
describe('Info', () => {
  /*
  * Test the /GET route
  */
  describe('GET /datastores', () => {
    it('it should GET datastores ', (done) => {
      chai.request(server)
        .get('/info/datastores')
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
});
