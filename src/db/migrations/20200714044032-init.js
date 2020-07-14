'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userid: {
        type: Sequelize.CHAR(60),
        allowNull: false,
        unique: true
      },
      username: {
        type: Sequelize.STRING,
        allowNULL: false,
      },
      hash: {
        type: Sequelize.CHAR(60),
        allowNULL: false,
      },
      salt: {
        type: Sequelize.CHAR(30),
        allowNULL: false,
      },
      reputation: {
        type: Sequelize.INTEGER,
        allowNULL: false,
        defaultValue: 0
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    })
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('Users')
  },
}
