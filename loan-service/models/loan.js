'use strict';
module.exports = (sequelize, DataTypes) => {
  var Loan = sequelize.define('loan', {
    borrower_id: {
      type: DataTypes.INTEGER,
      description: 'ID of the borrower',
      mutable: false,
      purpose: 'operational',
      producing_system: 'loan-service',
      consuming_systems: ['loan-factory'],
      origin: 'generated'
    },
    amount: {
      type: DataTypes.INTEGER,
      description: 'Principal loan amount in base currency',
      mutable: true,
      purpose: 'operational',
      producing_system: 'lead-cycle',
      consuming_systems: ['mambu'],
      origin: 'customer'
    },
    maturity: {
      type: DataTypes.INTEGER,
      description: 'Maturity of the loan in months',
      mutable: true,
      purpose: 'operational',
      producing_system: 'lead-cycle',
      consuming_systems: ['mambu'],
      origin: 'customer'
    },
    interest_rate: {
      type: DataTypes.INTEGER,
      description: 'Interest rate in percent',
      mutable: true,
      purpose: 'operational',
      producing_system: 'lead-cycle',
      consuming_systems: ['mambu'],
      origin: 'customer'
    },
    product_id: {
      type: DataTypes.INTEGER,
      description: 'ID of KT product',
      mutable: true,
      purpose: 'operational',
      producing_system: 'lead-cycle',
      consuming_systems: ['mambu'],
      origin: 'customer'
    },
    created_at: {
       type: DataTypes.DATE(3),
       defaultValue: sequelize.literal('CURRENT_TIMESTAMP(3)'),
       description: 'Timestamp of entity creation',
       mutable: true,
       purpose: 'operational',
       producing_system: 'loan-service',
       consuming_systems: [],
       origin: 'generated'
     },
     updated_at: {
       type: DataTypes.DATE(3),
       defaultValue: sequelize.literal('NULL'),
       description: 'Timestamp of entity creation',
       mutable: true,
       purpose: 'operational',
       producing_system: 'loan-service',
       consuming_systems: [],
       origin: 'generated'
     },
  }, {
    underscored: true
  });
  Loan.description = () => {
    return('Captures all the parameters of a term loan for a borrower');
  }
  Loan.versioned = () => {
    return(false);
  }
  Loan.associate = function(models) {
    // associations can be defined here
  };
  return Loan;
};
