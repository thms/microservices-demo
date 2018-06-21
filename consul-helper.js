var consul = require('consul')();

const listServices = () => consul.agent.service.list(function(err, result) {
  if (err) throw err;
  console.log(result)
});

{ 'loan-service-12345':
   { ID: 'loan-service-12345',
     Service: 'loan-service',
     Tags: [ 'node', 'rest' ],
     Address: '10.94.1.37',
     Meta: {},
     Port: 3000,
     EnableTagOverride: false,
     CreateIndex: 0,
     ModifyIndex: 0 } }

const getServiceNodes = (serviceName) => consul.catalog.service.nodes(serviceName, function(err, result) {
  if (err) throw err;
  console.log(result);
});
