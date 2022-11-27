const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
require("express-async-errors");
const { connectDB } = require("./config/db");
const { errorHandler } = require("./middleware/errorMiddleware");
const app = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1/goals", require("./routes/goalRoutes"));
app.use("/api/v1/users", require("./routes/userRoutes"));

app.use(errorHandler);


connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server port is ${port}`);
  });
});
