const express = require("express");
require("dotenv").config();

const cors = require("cors");

const accountsRoutes = require("./routes/accounts.routes");

const app = express();

// app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

app.use("/accounts", accountsRoutes);

app.get("/", (req, res) => {
  res.json({ message: "API is running...Welcome to E-Bank" });
});

app.all("*", (req, res) => {
  res.status(404).json({ message: "Resource Not Found" });
});

module.exports = app;
