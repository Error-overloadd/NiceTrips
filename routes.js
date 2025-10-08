/*** Created by Lawrencium_X on 10/7/2025. */


// routes/index.js
const express = require("express");
const app = express.Router();
var controller = require('./controllers/General');

// Define routes here
   app.get("/verify_user", controller.verifyUser);

module.exports = app;
