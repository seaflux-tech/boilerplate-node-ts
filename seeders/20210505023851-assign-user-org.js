'use strict';

module.exports = {
  up: async (queryInterface, _) => {
    await queryInterface.bulkUpdate('users', {
      organizationId: 1,
    }, {
      id: 1,
    },
    );

    await queryInterface.bulkUpdate('users', {
      organizationId: 1,
    }, {
      id: 2,
    },
    );

    await queryInterface.bulkUpdate('users', {
      organizationId: 2,
    }, {
      id: 3,
    },
    );
  },

  down: async (_queryInterface, _Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
