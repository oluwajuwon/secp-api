'use strict';
module.exports = (sequelize, DataTypes) => {
  const Wallet = sequelize.define('Wallet', {
    schoolId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    currentBalance: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  }, {});
  Wallet.associate = function(models) {
    // associations can be defined here
    Wallet.belongsTo(models.School, {
      foreignKey: 'schoolId',
      as: 'school',
      onDelete: 'CASCADE'
    });
  };
  return Wallet;
};