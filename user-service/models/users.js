'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('user', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
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
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};
