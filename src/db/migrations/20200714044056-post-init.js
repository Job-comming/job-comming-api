'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      writerId: {
        type: Sequelize.STRING,
        onDelete: 'cascade',
        references: {
          model: 'Users',
          key: 'userId'
        },
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING,
      },
      option: {
        type: Sequelize.BOOLEAN,
        allowNULL: false,
      },
      content: {
        type: Sequelize.TEXT,
        allowNULL: false,
      },
      category: {
        type: Sequelize.STRING,
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
      },
    })
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('Posts')
  },
}
