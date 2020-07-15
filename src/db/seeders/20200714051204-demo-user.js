'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [{
      userid: 'id0',
      reputation: '0',
      username: '멘토0',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      userid: 'id1',
      reputation: '0',
      username: '멘티0',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      userid: 'id2',
      reputation: '0',
      username: '멘토1',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      userid: 'id3',
      reputation: '0',
      username: '멘토2',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      userid: 'id4',
      reputation: '0',
      username: '멘토3',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      userid: 'id5',
      reputation: '0',
      username: '멘티0',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      userid: 'id6',
      reputation: '0',
      username: '멘티1',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      userid: 'id7',
      reputation: '0',
      username: '멘티2',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      userid: 'id8',
      reputation: '0',
      username: '멘티3',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      userid: 'id9',
      reputation: '0',
      username: '멘티4',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
