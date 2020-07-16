'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Reviews', [{
      mentoringId: 1,
      senderId: 'id0',
      receiverId: 'id5',
      comment: '고생했습니다 이제는 텐서플로우 마스터 !',
      starRate: 5,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Reviews', null, {});
  }
};
