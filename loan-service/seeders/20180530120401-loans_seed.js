'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('loans', [
          {id: 1, borrower_id: 1, principal: 1000, interest_rate: 5, maturity: 12, product_id: 1},
          {id: 2, borrower_id: 1, principal: 2000, interest_rate: 12, maturity: 9, product_id: 1},
          {id: 3, borrower_id: 2, principal: 1500, interest_rate: 6, maturity: 3, product_id: 1},
          {id: 4, borrower_id: 3, principal: 500, interest_rate: 0, maturity: 6, product_id: 2}
      ], {});

  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('loans', null, {});
  }
};
