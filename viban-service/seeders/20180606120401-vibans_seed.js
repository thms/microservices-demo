'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('vibans', [
        {id: 1, loan_id: 1, iban: '113456789'},
        {id: 2, loan_id: 2, iban: '123456789'},
        {id: 3, loan_id: 3, iban: '133456789'},
        {id: 4, loan_id: 4, iban: '143456789'},
      ], {});

  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('vibans', null, {});
  }
};
