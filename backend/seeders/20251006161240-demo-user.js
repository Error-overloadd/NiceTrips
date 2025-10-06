'use strict';

/** @type {import('sequelize-cli').Migration} */
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
   // create feak data
     await queryInterface.bulkInsert("user", [
      {
        Username: "Der",
        Email_Address: "sarah@example.com",
        Postal_Address: "123 University Ave, Calgary, AB",
        Mobile_Number: "4031112222",
        Created_Datetime: new Date(),
        Updated_Datetime: new Date(),
      },
      {
        Username: "derek_liu",
        Email_Address: "derek@example.com",
        Postal_Address: "45 Campus Blvd NW, Calgary, AB",
        Mobile_Number: "4032223333",
        Created_Datetime: new Date(),
        Updated_Datetime: new Date(),
      },
      {
        Username: "john_smith",
        Email_Address: "john.smith@example.com",
        Postal_Address: "99 Riverfront Ave SE, Calgary, AB",
        Mobile_Number: "4033334444",
        Created_Datetime: new Date(),
        Updated_Datetime: new Date(),
      },
      {
        Username: "amy_wong",
        Email_Address: "amy.wong@example.com",
        Postal_Address: "10 Kensington Rd NW, Calgary, AB",
        Mobile_Number: "4034445555",
        Created_Datetime: new Date(),
        Updated_Datetime: new Date(),
      },
      {
        Username: "kevin_chen",
        Email_Address: "kevin.chen@example.com",
        Postal_Address: "700 4th Ave SW, Calgary, AB",
        Mobile_Number: "4035556666",
        Created_Datetime: new Date(),
        Updated_Datetime: new Date(),
      },
    ]);
    
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("user", {}, {});
  }
};
