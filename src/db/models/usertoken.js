'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserToken = sequelize.define('UserToken', {
    schoolId: DataTypes.INTEGER,
    code: DataTypes.BIGINT,
  }, {});
  UserToken.associate = function(models) {
    // associations can be defined here
    UserToken.belongsTo(models.School, {
      foreignKey: 'schoolId',
      as: 'school',
      onDelete: 'CASCADE'
    });
  };
  return UserToken;
};