'use strict';
module.exports = (sequelize, DataTypes) => {
  var Viban = sequelize.define('viban', {
    borrower_id: DataTypes.INTEGER,
    iban: DataTypes.STRING
  }, {
    underscored: true
  });
  Viban.associate = function(models) {
    // associations can be defined here
  };
  return Viban;
};
