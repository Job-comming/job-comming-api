'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('user_info', [{
      auth_user_id: '1',
      username: '윤창권',
      email: 'ckwon@gmail.com',
      state: '뉴비',
      reputation: 0
    }, {
      auth_user_id: '2',
      username: '김수아',
      email: 'skim@gmail.com',
      state: '시니어',
      reputation: 0
    }, {
      auth_user_id: '3',
      username: '이진섭',
      email: 'jlee@gmail.com',
      state: '시니어',
      reputation: 0
    }, {
      auth_user_id: '4',
      username: '박혜원',
      email: 'hpark@gmail.com',
      state: '주니어',
      reputation: 0
    }, {
      auth_user_id: '5',
      username: '김보민',
      email: 'bkim@gmail.com',
      state: '뉴비',
      reputation: 0
    }])
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('user_info', null, {})
  }
};
