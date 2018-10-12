'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('services', [
      {id: 1, name: 'loan-service', secret: 'loan-secret', token: null, roles: JSON.stringify(['service']), scopes: JSON.stringify([])},
      {id: 2, name: 'loan-factory-service', secret: 'loan-factory-secret', token: null, roles: JSON.stringify(['service']), scopes: JSON.stringify(['loan:write', 'loan:read', 'loan:score', 'installment-plan:write', 'user:write'])},
      {id: 3, name: 'installment-calculator-service', secret: 'installment-calculator-secret', token: null, roles: JSON.stringify(['service']), scopes: JSON.stringify([])},
      {id: 4, name: 'scoring-service', secret: 'scoring-secret', token: null, roles: JSON.stringify(['service']), scopes: JSON.stringify([])},
      {id: 5, name: 'user-service', secret: 'user-secret', token: null, roles: JSON.stringify(['service']), scopes: JSON.stringify([])},
      {id: 6, name: 'viban-service', secret: 'viban-secret', token: null, roles: JSON.stringify(['service']), scopes: JSON.stringify([])},
      {id: 7, name: 'mobile-app', secret: 'mobile-app-secret', token: null, roles: JSON.stringify(['service']), scopes: JSON.stringify(['user:read', 'loan:read'])},
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('services', null, {});
  }
};
