'use strict';

module.exports = {
  up: async (queryInterface, _) => {
    await queryInterface.bulkInsert('organizations', [
      {
        id: 1,
        userId: 1,
        name: 'Seaflux',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        userId: 2,
        name: 'Roxcreation',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, _) => {
    await queryInterface.bulkDelete('organizations', null, {});
  }
};
