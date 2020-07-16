'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [{
      userId: 'id0',
      reputation: 0,
      username: '멘토0',
      deposit: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      userId: 'id1',
      reputation: 0,
      username: '멘티0',
      deposit: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      userId: 'id2',
      reputation: 0,
      username: '멘토1',
      deposit: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      userId: 'id3',
      reputation: 0,
      username: '멘토2',
      deposit: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      userId: 'id4',
      reputation: 0,
      username: '멘토3',
      deposit: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      userId: 'id5',
      reputation: 0,
      username: '멘티0',
      deposit: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      userId: 'id6',
      reputation: 0,
      username: '멘티1',
      deposit: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      userId: 'id7',
      reputation: 0,
      username: '멘티2',
      deposit: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      userId: 'id8',
      reputation: 0,
      username: '멘티3',
      deposit: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      userId: 'id9',
      reputation: 0,
      username: '멘티4',
      deposit: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
