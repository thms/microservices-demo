let express = require('express');
let router = express.Router();
let definition = require('sequelize-json-schema');
const SchemaFactory = require('sequelize-to-json-schema');
let db = require('../models/index');
let Loan = require('../models/loan');

// Both libraries would need to be modified to give us full visibility, but it is not hard to do.
// But then, no-one in the company is using sequelize anyway, so it does not matter.

router.get('/datastores', function(req, res, next) {
  // first method:
  let schema1 = {};
  schema1 = definition(db.loan)

  // second method:
  // custom schema will add field 'description' to the attribute 'amount' for the model 'loan'
  const factory = new SchemaFactory({
    customSchema: {
      loan: { amount: { description: 'Principal Amount' } },
    },
    associations: [],
    hrefBase: 'http://example.com'
  });
  let schemaGenerator = {}
  schemaGenerator = factory.getSchemaGenerator(db.loan);
  let schema2 = schemaGenerator.getSchema();

  res.send({
    datastores: [
      {
        name: 'loan_service_development',
        type: 'mysql',
        owner: 'loan-service',
        schema: schema2
      }
    ]
  });
});

module.exports = router;
