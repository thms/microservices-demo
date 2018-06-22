'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('users', [
        {id: 1, name: 'mike', email: 'mike@example.com'},
        {id: 2, name: 'minnie', email: 'minnie@example.com'}
      ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('users', null, {});
  }
};
