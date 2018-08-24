'use strict';
module.exports = (sequelize, DataTypes) => {
  var Loan = sequelize.define('loan', {
    borrower_id: {
      type: DataTypes.INTEGER,
      description: 'ID of the borrower'
    },
    amount: {
      type: DataTypes.INTEGER,
      description: 'Principal loan amount in base currency'
    },
    maturity: {
      type: DataTypes.INTEGER,
      description: 'Maturity of the loan in months'
    },
    interest_rate: {
      type: DataTypes.INTEGER,
      description: 'Interest rate in percent'
    },
    product_id: {
      type: DataTypes.INTEGER,
      description: 'ID of KT product'
    },
    created_at: {
       type: DataTypes.DATE(3),
       defaultValue: sequelize.literal('CURRENT_TIMESTAMP(3)'),
       description: 'Timestamp of entity creation'
     },
     updated_at: {
       type: DataTypes.DATE(3),
       defaultValue: sequelize.literal('NULL'),
       description: 'Timestamp of entity creation'
     },
  }, {
    underscored: true
  });
  Loan.description = () => {
    return('Captures all the parameters of a term loan for a borrower');
  }
  Loan.associate = function(models) {
    // associations can be defined here
  };
  return Loan;
};
