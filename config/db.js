/*** Created by Lawrencium_X on 10/7/2025.*/

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("Nicetrips_db", "root", "Cybertronx@5", {
    host: "127.0.0.1",   // or your DB server address
    dialect: "mysql",    // we’re using MySQL
    logging: false       // disable SQL logging in console
});

module.exports = sequelize;
