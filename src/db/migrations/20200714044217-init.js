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
      mentor_id: {
        type: Sequelize.CHAR(60),
        references: {
          model: 'Users',
          key: 'userid'
        },
        allowNull: false,
      },
      mentee_id: {
        type: Sequelize.CHAR(60),
        references: {
          model: 'Users',
          key: 'userid'
        },
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNULL: true,
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
    await queryInterface.dropTable('Mentorings');
  }
};
