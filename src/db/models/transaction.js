'use strict';
module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    schoolId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    details: DataTypes.STRING,
    referenceNumber: DataTypes.BIGINT,
    status: DataTypes.STRING
  }, {});
  Transaction.associate = function(models) {
    // associations can be defined here
    Transaction.belongsTo(models.School, {
      foreignKey: 'schoolId',
      as: 'school',
      onDelete: 'CASCADE'
    });
  };
  return Transaction;
};