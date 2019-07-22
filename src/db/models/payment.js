'use strict';
module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define('Payment', {
    userId: DataTypes.INTEGER,
    status: DataTypes.STRING,
    expMonth: DataTypes.STRING,
    expYear: DataTypes.STRING,
    amount: DataTypes.STRING,
    plan: DataTypes.STRING
  }, {});
  Payment.associate = function(models) {
    // associations can be defined here
  };
  return Payment;
};