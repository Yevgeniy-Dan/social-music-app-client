const sequelize = require("../utils/database");

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log(`Connected to the database.`.cyan.underline);
  } catch (error) {
    console.log("This error is in the dbconnect file", error);
    process.exit(1);
  }
};

module.exports = connectDB;
