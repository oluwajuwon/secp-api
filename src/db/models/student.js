'use strict';
module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define('Student', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    middleName: DataTypes.STRING,
    dateOfBirth: DataTypes.STRING,
    gender: DataTypes.STRING,
    schoolName: DataTypes.STRING,
    Term: DataTypes.STRING,
    year: DataTypes.STRING,
    class: DataTypes.STRING,
    amount: DataTypes.STRING,
    paymentStatus: DataTypes.STRING,
    uuid: DataTypes.UUID,
    addedBy: DataTypes.INTEGER
  }, {});
  Student.associate = function(models) {
    // associations can be defined here
  };
  return Student;
};