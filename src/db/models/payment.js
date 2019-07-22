'use strict';
module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define('Payment', {
    schoolId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expMonth: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expYear: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    plan: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    // freezeTableName: true,
  });
  Payment.associate = function(models) {
    // associations can be defined here
    Payment.belongsTo(models.School, {
      foreignKey: 'schoolId',
      as: 'school',
      onDelete: 'CASCADE'
    });
  };
  return Payment;
};