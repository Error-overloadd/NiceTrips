const path = require("path");
require("dotenv").config({ path: path.resolve(process.cwd(), ".env") });

const common = {
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "secret",
  database: process.env.DB_NAME || "nicetrips",
  host: process.env.DB_HOST || "127.0.0.1",
  port: Number(process.env.DB_PORT || 3306),
  dialect: process.env.DB_DIALECT || "mysql",
  logging: String(process.env.DB_LOGGING).toLowerCase() === "true",
  define: { underscored: true },
};

module.exports = {
  development: { ...common },
  test: { ...common, database: (process.env.DB_NAME || "db") + "_test" },
  production: { ...common },
};