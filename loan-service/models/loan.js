'use strict';
module.exports = (sequelize, DataTypes) => {
  var Loan = sequelize.define('loan', {
    borrower_id: DataTypes.INTEGER,
    principal: DataTypes.INTEGER,
    maturity: DataTypes.INTEGER,
    interest_rate: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    created_at: {
       type: DataTypes.DATE(3),
       defaultValue: sequelize.literal('CURRENT_TIMESTAMP(3)'),
     },
     updated_at: {
       type: DataTypes.DATE(3),
       defaultValue: sequelize.literal('NULL'),
     },
  }, {
    underscored: true
  });
  Loan.associate = function(models) {
    // associations can be defined here
  };
  return Loan;
};
