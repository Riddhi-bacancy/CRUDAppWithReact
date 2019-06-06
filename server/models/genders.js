'use strict';
module.exports = (sequelize, DataTypes) => {
  const Genders = sequelize.define('Genders', {
    gender: DataTypes.STRING
  }, {});
  Genders.associate = function(models) {
    // associations can be defined here
  };
  return Genders;
};