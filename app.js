/*** Created by Lawrencium_X on 10/7/2025.*/


// app.js
const express = require("express");
const app = express();
const routes = require("./routes");
const db = require("./models");
const morgan = require("morgan");


// connect to DB
db.setup(
    __dirname + "/models/",        // path to your models folder
    "Nicetrips_db",                // database name
    "root",                  // DB username
    "Cybertronx@5",         // DB password
    {
        host: "localhost",
        dialect: "mysql",
        logging: false
    }
);

// test connection
db.seqObj.authenticate()
    .then(() => console.log("✅ Database connected"))
.catch(err => console.error("❌ DB connection error:", err));

// Define the port (default 3000 if not set in environment)
const PORT = process.env.PORT || 3000;

// log url and response in nodejs logs
app.use(morgan("dev"));

// Middleware to parse JSON requests
app.use(express.json());


//mount routes
app.use("/", routes);


// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
