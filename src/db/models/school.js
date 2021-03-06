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
      unique: {
        args: true,
        msg: 'Email address is already registered'
      },
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
    verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  }, {
    // freezeTableName: true,
  });
  School.associate = function(models) {
    // associations can be defined here
    School.hasMany(models.Student, { foreignKey: 'schoolId', as: 'student' });
    School.hasMany(models.Payment, { foreignKey: 'schoolId', as: 'payment' });
    School.hasOne(models.UserToken, { foreignKey: 'schoolId', as: 'userToken'});
    School.hasOne(models.Wallet, { foreignKey: 'schoolId', as: 'wallet'});
    School.hasMany(models.Transaction, { foreignKey: 'schoolId', as: 'transaction'});
  };
  return School;
};