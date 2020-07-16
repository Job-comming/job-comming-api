'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Reviews', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      mentoringId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'cascade',
        references: {
          model: 'Mentorings',
          key: 'id'
        },
      },
      senderId: {
        type: Sequelize.STRING,
        allowNULL: false,
      },
      receiverId: {
        type: Sequelize.STRING,
        allowNULL: false,
      },
      comment: {
        type: Sequelize.TEXT,
        allowNULL: false,
      },
      starRate: {
        type: Sequelize.INTEGER,
        allowNULL: false,
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
  down: async (queryInterface) => {
    await queryInterface.dropTable('Reviews')
  },
}
