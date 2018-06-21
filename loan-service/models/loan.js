'use strict';
module.exports = (sequelize, DataTypes) => {
  var Loan = sequelize.define('loan', {
    borrower_id: DataTypes.INTEGER,
    principal: DataTypes.INTEGER,
    maturity: DataTypes.INTEGER,
    interest_rate: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER
  }, {
    underscored: true
  });
  Loan.associate = function(models) {
    // associations can be defined here
  };
  return Loan;
};
