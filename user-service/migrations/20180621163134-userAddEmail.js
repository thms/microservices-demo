'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn(
        'users',
        'email',
       Sequelize.STRING
      );
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn(
        'users',
        'email',
      );
  }
};
