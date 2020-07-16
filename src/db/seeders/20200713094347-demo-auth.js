'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Auths', [{
      googleId: 'id0'
    },
    {
      googleId: 'id1'
    },
    {
      googleId: 'id2'
    },
    {
      googleId: 'id3'
    },
    {
      googleId: 'id4'
    },
    {
      googleId: 'id5'
    },
    {
      googleId: 'id6'
    },
    {
      googleId: 'id7'
    },
    {
      googleId: 'id8'
    }, {
      googleId: 'id9'
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Auths', null, {});
  }
};
