'use strict';

const User = require('../models/User');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /* await queryInterface.bulkInsert('Users', [{
      name: 'John Doe',
      email:'john@example',
      password: 'password'
    }], {}); */
    return User.create({
      name: 'John Doe',
      email:'john@example',
      password: 'password'
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
