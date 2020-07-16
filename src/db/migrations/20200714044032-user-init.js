'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      // id: {
      //   allowNull: false,
      //   autoIncrement: true,
      //   primaryKey: true,
      //   type: Sequelize.INTEGER,
      // },
      userId: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
        onDelete: 'cascade',
        references: {
          model: 'Auths',
          key: 'googleId'
        },
      },
      username: {
        type: Sequelize.STRING,
        allowNULL: false,
      },
      reputation: {
        type: Sequelize.INTEGER,
        allowNULL: false,
        defaultValue: 0
      },
      deposit: {
        type: Sequelize.INTEGER,
        allowNULL: false,
        defaultValue: 0
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
    await queryInterface.dropTable('Users')
  },
}
