let express = require('express');
let router = express.Router();
let definition = require('sequelize-json-schema');
const SchemaFactory = require('sequelize-to-json-schema');
let db = require('../models/index');
let Invoice = require('../models/invoice');

// Both libraries would need to be modified to give us full visibility, but it is not hard to do.
// But then, no-one in the company is using sequelize anyway, so it does not matter.

router.get('/datastores', function(req, res, next) {
  // first method:
  let schema1 = {};
  schema1 = definition(db.invoice)

  // second method:
  // custom schema will add field 'description' to the attribute 'amount' for the model 'loan'
  const factory = new SchemaFactory({
    customSchema: {
      invoice: { amount: { description: 'Principal Amount' } },
    },
    associations: [],
    hrefBase: 'http://example.com'
  });
  let schemaGenerator = {}
  schemaGenerator = factory.getSchemaGenerator(db.invoice);
  let schema2 = schemaGenerator.getSchema();

  res.send({
    datastores: [
      {
        name: 'invoice_service_development',
        type: 'mysql',
        owner: 'invoice-service',
        schemas: {
          Loan: schema1
        }
      }
    ]
  });
});

module.exports = router;
