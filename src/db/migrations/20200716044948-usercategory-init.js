'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('UserCategories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.STRING,
        allowNull: false,
        onDelete: 'cascade',
        references: {
          model: 'Users',
          key: 'userId'
        },
      },
      category: {
        type: Sequelize.STRING,
        allowNULL: false
      },
      level: {
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
    await queryInterface.dropTable('UserCategories')
  },
}
