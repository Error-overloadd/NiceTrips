'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
      await queryInterface.createTable("users", {
        User_ID: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        Username: {
          type: Sequelize.STRING(25),
          allowNull: false,
        },
        Email_Address: {
          type: Sequelize.STRING(25),
          allowNull: false,
          unique: true, // 唯一约束
        },
        Postal_Address: {
          type: Sequelize.STRING(50),
          allowNull: true,
        },
        Mobile_Number: {
          type: Sequelize.STRING(15),
          allowNull: true,
        },
        Password_Hash: {
          type: Sequelize.STRING(200),
          allowNull: false,
        },
        Created_Datetime: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.fn("NOW"),
        },
        Updated_Datetime: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.fn("NOW"),
        },
        Role: { type: Sequelize.STRING(10), allowNull: false, defaultValue: "user" }, // ✅ 一次到位
      });
    },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     await queryInterface.dropTable('users');
  }
};
