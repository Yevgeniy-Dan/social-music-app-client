const express = require("express");
const dotenv = require("dotenv").config();
const colors = require("colors");
const bodyParser = require("body-parser");

const { errorHandler } = require("./middleware/errorMiddleware");
const port = process.env.PORT || 5000;

const postRoutes = require("./routes/postRoutes");
const connectDB = require("./config/dbconnect");
const sequelize = require("./utils/database");
const { seed } = require("./seeds/seed");

const app = express();

app.use(bodyParser.json());

app.use("/api/posts", postRoutes);

app.use(errorHandler);

connectDB()
  .then(() => {
    return sequelize.sync();
  })
  .then(() => {
    if (process.env.NODE_ENV === "development") {
      return seed();
    }
    return;
  })
  .then(() => {
    app.listen(port, () => console.log(`Server started on port ${port}`));
  })
  .catch((error) => {
    console.error("Error connecting to database: ".red.underline, error);
  });
