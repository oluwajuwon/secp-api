'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      schoolId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Schools',
          key: 'id',
          as: 'schoolId',
        },
        onDelete: 'CASCADE',
      },
      type: {
        type: Sequelize.STRING
      },
      amount: {
        type: Sequelize.FLOAT
      },
      details: {
        type: Sequelize.STRING
      },
      referenceNumber: {
        type: Sequelize.BIGINT
      },
      status: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Transactions');
  }
};