'use strict';
module.exports = (sequelize, DataTypes) => {
  var Service = sequelize.define('service', {
    name: {
      type: DataTypes.STRING
    },
    secret: {
      type: DataTypes.STRING
    },
    token: {
      type: DataTypes.STRING
    },
    roles: {
      type: DataTypes.JSON
    },
    scopes: {
      type: DataTypes.JSON
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
    underscored: true,
  });
  Service.associate = function(models) {
    // associations can be defined here
  };
  return Service;
};
