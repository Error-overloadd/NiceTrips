'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const { DataTypes } = Sequelize;

    await queryInterface.createTable('user', {
      User_ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      Username: {
        type: DataTypes.STRING(25),
        allowNull: false,
      },
      Email_Address: {
        type: DataTypes.STRING(25),
        allowNull: false,
      },
      Postal_Address: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      Mobile_Number: {
        type: DataTypes.STRING(15),
        allowNull: true,
      },
      // timestamps: true → createdAt / updatedAt
      Created_Datetime: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      Updated_Datetime: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal(
          'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
        ),
      },
    });

  },

  async down(queryInterface) {

    await queryInterface.dropTable('user');
  },
};