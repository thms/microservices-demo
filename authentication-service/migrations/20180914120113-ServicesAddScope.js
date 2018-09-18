'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn(
      'services',
      'scopes',
      {
        type: Sequelize.JSON,
        allowNull: false,
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn(
        'services',
        'scopes'
      );
  }
};
