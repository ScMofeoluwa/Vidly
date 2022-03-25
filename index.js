const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const error = require("./middleware/error");
const genres = require("./routes/genres");
const users = require("./routes/users");
const auth = require("./routes/auth");
const customers = require("./routes/customers");
const movies = require("./routes/movies");
const rentals = require("./routes/rentals");
const app = express();

if (!process.env.SECRET_KEY) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined");
  process.exit(1);
}

mongoose
  .connect("mongodb://localhost/vidly")
  .then(() => console.log("Connected to MongoDB.."))
  .catch((err) => console.log("Could not connect to MongoDB", err));

app.use(express.json());
app.use("/api/genres", genres);
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);

app.use(error);

const port = process.env.PORT || 2000;
app.listen(port, () => console.log(`Listening on ${port}...`));
