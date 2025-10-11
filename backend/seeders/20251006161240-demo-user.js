'use strict';
const bcrypt = require("bcrypt-ts"); // ✅ 一定要加这一行

/** @type {import('sequelize-cli').Migration} */
  const now = new Date();
  const hash = (p) => bcrypt.hashSync(p, 12); // 手动加密

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert("users", [
      {
        Username: "Der",
        Email_Address: "sarah@example.com",
        Postal_Address: "123 University Ave, Calgary, AB",
        Mobile_Number: "4031112222",
        Password_Hash: hash("123213"),  
        Created_Datetime: now,
        Updated_Datetime: now,
         Role: "user",  
      },
      {
        Username: "derek_liu",
        Email_Address: "derek@example.com",
        Postal_Address: "45 Campus Blvd NW, Calgary, AB",
        Mobile_Number: "4032223333",
        Password_Hash: hash("123213"),
        Created_Datetime: now,
        Updated_Datetime: now,
         Role: "user",  
      },
      {
        Username: "john_smith",
        Email_Address: "john.smith@example.com",
        Postal_Address: "99 Riverfront Ave SE, Calgary, AB",
        Mobile_Number: "4033334444",
        Password_Hash: hash("11111"),
        Created_Datetime: now,
        Updated_Datetime: now,
         Role: "user",  
      },
      {
        Username: "amy_wong",
        Email_Address: "amy.wong@example.com",
        Postal_Address: "10 Kensington Rd NW, Calgary, AB",
        Mobile_Number: "4034445555",
        Password_Hash: hash("123213"),
        Created_Datetime: now,
        Updated_Datetime: now,
         Role: "user",  
      },
      {
        Username: "kevin_chen",
        Email_Address: "kevin.chen@example.com",
        Postal_Address: "700 4th Ave SW, Calgary, AB",
        Mobile_Number: "4035556666",
        Password_Hash: hash("123213"),
        Created_Datetime: now,
        Updated_Datetime: now,
         Role: "user",  
      },
      {
         Username: "Admin",
        Email_Address: "admin@example.com",
        Password_Hash: hash("admin123"),
        Role: "admin", // ✅ 管理员必须写
        Created_Datetime: now,
        Updated_Datetime: now,
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("users", {}, {});

  }
};
