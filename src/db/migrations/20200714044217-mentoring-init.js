'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Mentorings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      category: {
        type: Sequelize.STRING,
        allowNULL: false
      },
      mentorId: {
        type: Sequelize.STRING,
        references: {
          model: 'Users',
          key: 'userId'
        },
        onDelete: 'cascade',
        allowNull: false,
      },
      menteeId: {
        type: Sequelize.STRING,
        references: {
          model: 'Users',
          key: 'userId'
        },
        onDelete: 'cascade',
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNULL: true,
      },
      finished: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNULL: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Mentorings');
  }
};
