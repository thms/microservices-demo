'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('vibans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      loan_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      iban: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: ''
      },
      created_at: {
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('vibans');
  }
};
