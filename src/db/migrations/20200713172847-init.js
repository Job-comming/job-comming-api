'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Mentorings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      mentor: {
        type: Sequelize.CHAR(60),
        references: {
          model: {
            tableName: 'Users'
          },
          key: 'userid'
        },
        allowNull: false,
      },
      mentee: {
        type: Sequelize.CHAR(60),
        references: {
          model: {
            tableName: 'Users'
          },
          key: 'userid'
        },
        allowNull: false,
      },
      category: {
        type: Sequelize.STRING,
        allowNULL: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Mentorings')
  }
};
