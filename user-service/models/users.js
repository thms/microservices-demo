'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('user', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    created_at: {
       type: DataTypes.DATE(3),
     },
     updated_at: {
       type: DataTypes.DATE(3),
       allowNull: true,
       defaultValue: null
     },
  }, {
    underscored: true
  });
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};
