'use strict';
module.exports = (sequelize, DataTypes) => {
  const School = sequelize.define('School', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    logo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    // freezeTableName: true,
  });
  School.associate = function(models) {
    // associations can be defined here
    School.hasMany(models.Student, { foreignKey: 'schoolId', as: 'student' });
    School.hasMany(models.Payment, { foreignKey: 'schoolId', as: 'payment' });
  };
  return School;
};