'use strict';

module.exports = {
  up: async (queryInterface, _) => {
    await queryInterface.bulkInsert('users', [
      {
        id: 1,
        firstName: "Jay",
        lastName: "Mehta",
        email: "jm@example.com",
        password: "$2b$10$THU2Vmgc9WVPfvBY1SL8H.nWMgSdc6SzS6p97NDSLFyz67rOQcZoq", // Jay@123
        organizationId: null,
        emailVerificationStatus: "Accepted",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        firstName: "Het",
        lastName: "Mehta",
        email: "hm@example.com",
        password: "$2b$10$THU2Vmgc9WVPfvBY1SL8H.nWMgSdc6SzS6p97NDSLFyz67rOQcZoq",
        organizationId: null,
        emailVerificationStatus: "Accepted",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        firstName: "Khush",
        lastName: "Mehta",
        email: "km@example.com",
        password: "$2b$10$THU2Vmgc9WVPfvBY1SL8H.nWMgSdc6SzS6p97NDSLFyz67rOQcZoq",
        organizationId: null,
        emailVerificationStatus: "Accepted",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, _) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};
