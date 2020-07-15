'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Mentorings', [{
      category: 'machine learning',
      mentor_id: 'id0',
      mentee_id: 'id5',
      description: '영의정이 되어보자',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      category: 'frontend',
      mentor_id: 'id1',
      mentee_id: 'id6',
      description: '리액트 마스터가 되기까지',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Mentorings', null, {});
  }
};
