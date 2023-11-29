'use strict';

module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('categories', [
      {
        id: 1,
        userId: 1,
        name: "Rent",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        userId: 1,
        name: "Home office costs",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        userId: 1,
        name: "Utilities",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        userId: 1,
        name: "Advertising",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        userId: 2,
        name: "Entertainment",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        userId: 2,
        name: "Travel",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 7,
        userId: 2,
        name: "Taxes",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 8,
        userId: 2,
        name: "Vehicle expenses",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 9,
        userId: 2,
        name: "Business insurance",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 10,
        userId: 2,
        name: "Membership Fees",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('categories', null, {});
  }
};
