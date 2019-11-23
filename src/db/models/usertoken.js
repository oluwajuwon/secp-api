'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserToken = sequelize.define('UserToken', {
    userId: DataTypes.INTEGER,
    code: DataTypes.BIGINT,
  }, {});
  UserToken.associate = function(models) {
    // associations can be defined here
    UserToken.belongsTo(models.School, {
      foreignKey: 'userId',
      as: 'school',
      onDelete: 'CASCADE'
    });
  };
  return UserToken;
};