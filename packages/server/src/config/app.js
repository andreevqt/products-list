module.exports = {
  port: process.env.APP_PORT || 3000,
  url: process.env.APP_URL || "localhost",
  db_port: process.env.DB_PORT || "27017",
  db_url: process.env.DB_URL || "localhost",
  db_name: process.env.DB_NAME || "",
}