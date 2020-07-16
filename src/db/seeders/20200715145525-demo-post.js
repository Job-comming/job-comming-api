'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Posts', [{
      writerId: 'id0',
      title: '멘티 게 있느냐',
      option: 1,
      content: '이리오너라 업고놀자',
      category: 'machine learning',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      writerId: 'id5',
      title: '멘토님을 뫼시옵니다',
      option: 0,
      content: '황공하옵니다',
      category: 'machine learning',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      writerId: 'id1',
      title: '멘티를 찾습니다 !',
      option: 1,
      content: '리액트 가르쳐드려요',
      category: 'frontend',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      writerId: 'id6',
      title: '웹 프론트엔드 가르쳐주세요',
      option: 0,
      content: '리액트 배우고싶어요',
      category: 'frontend',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Posts', null, {});
  }
};
