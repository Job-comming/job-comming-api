'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('auth_user', [{
      auth_user_id: '1',
      service: 'service',
    }, {
      auth_user_id: '2',
      service: 'service'
    }, {
      auth_user_id: '3',
      service: 'service'
    }, {
      auth_user_id: '4',
      service: 'service'
    }, {
      auth_user_id: '5',
      service: 'service'
    }])
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('auth_user', null, {})
  }
};
