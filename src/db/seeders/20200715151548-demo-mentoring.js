'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Mentorings', [{
      category: 'machine learning',
      mentorId: 'id0',
      menteeId: 'id5',
      description: '영의정이 되어보자',
      finished: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      category: 'frontend',
      mentorId: 'id1',
      menteeId: 'id6',
      description: '리액트 마스터가 되기까지',
      finished: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Mentorings', null, {});
  }
};
