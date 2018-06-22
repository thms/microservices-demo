'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('user', {
    name: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    underscored: true
  });
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};
