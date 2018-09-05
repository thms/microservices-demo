'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('services', [
      {id: 1, name: 'loan-service', secret: 'loan-secret', token: null, roles: JSON.stringify(['service'])},
      {id: 2, name: 'loan-factory-service', secret: 'loan-factory-secret', token: null, roles: JSON.stringify(['service'])},
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('services', null, {});
  }
};
