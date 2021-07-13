'use strict';
module.exports = (sequelize, DataTypes) => {
  var Invoice = sequelize.define('invoice', {
    user_id: {
      type: DataTypes.INTEGER,
      description: 'ID of the user',
      mutable: false,
      purpose: 'operational',
      producing_system: 'invoice-service',
      consuming_systems: ['invoice-factory'],
      origin: 'generated'
    },
    amount: {
      type: DataTypes.INTEGER,
      description: 'Invoice amount in base currency',
      mutable: true,
      purpose: 'operational',
      producing_system: 'invoice-service',
      consuming_systems: ['tbd'],
      origin: 'customer'
    },
    from: {
      type: DataTypes.STRING,
      description: 'Email of the user',
      mutable: true,
      purpose: 'operational',
      producing_system: 'invoice-service',
      consuming_systems: ['tbd'],
      origin: 'customer'
    },
    client_name: {
      type: DataTypes.INTEGER,
      description: 'Name of the client',
      mutable: true,
      purpose: 'operational',
      producing_system: 'invoice-service',
      consuming_systems: ['tbd'],
      origin: 'customer'
    },
    invoice_number: {
      type: DataTypes.STRING,
      description: 'User specific invoice number',
      mutable: true,
      purpose: 'operational',
      producing_system: 'invoice-service',
      consuming_systems: ['tbd'],
      origin: 'generated'
    },
    invoice_date: {
       type: DataTypes.STRING,
       description: 'Date of the invoice',
       mutable: true,
       purpose: 'operational',
       producing_system: 'invoice-service',
       consuming_systems: [],
       origin: 'customer'
     },
    created_at: {
       type: DataTypes.DATE(3),
       defaultValue: sequelize.literal('CURRENT_TIMESTAMP(3)'),
       description: 'Timestamp of entity creation',
       mutable: true,
       purpose: 'operational',
       producing_system: 'invoice-service',
       consuming_systems: [],
       origin: 'generated'
     },
     updated_at: {
       type: DataTypes.DATE(3),
       defaultValue: sequelize.literal('NULL'),
       description: 'Timestamp of entity creation',
       mutable: true,
       purpose: 'operational',
       producing_system: 'invoice-service',
       consuming_systems: [],
       origin: 'generated'
     },
  }, {
    underscored: true
  });
  Invoice.description = () => {
    return('Captures all the parameters of an invoice for the user');
  }
  Invoice.versioned = () => {
    return(false);
  }
  Invoice.associate = function(models) {
    // associations can be defined here
  };
  return Invoice;
};
