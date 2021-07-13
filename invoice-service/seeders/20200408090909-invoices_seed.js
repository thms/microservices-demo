'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('invoices', [
          {id: 1,user_id: 1, amount: 1000, from: "mike@example", client_name: "Jane Doe", invoice_number: "2020-001", invoice_date: "2020-01-31"},
          {id: 2, user_id: 1, amount: 2000, from: "mike@example", client_name: "Mr. Brown", invoiceNumber: "2020-003", invoiceDate: "2020-02-15"},
          {id: 3, user_id: 2, amount: 1500, from: "minnie@example", client_name: "Manni the Shark", invoiceNumber: "2019-003", invoiceDate: "2020-02-15"},
          {id: 4, user_id: 3, amount: 500, from: "jane@example", client_name: "Han Solo", invoiceNumber: "2020-004", invoiceDate: "2020-02-17"}
      ], {});

  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('invoices', null, {});
  }
};
