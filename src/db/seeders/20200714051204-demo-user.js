'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        userid: 'id1',
        hash: 'hash',
        salt: 'salt',
        reputation: '0',
        username: '신사임당',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userid: 'id2',
        hash: 'hash',
        salt: 'salt',
        reputation: '0',
        username: '허난설헌',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userid: 'id3',
        hash: 'hash',
        salt: 'salt',
        reputation: '0',
        username: '허균',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {})
  },
}
