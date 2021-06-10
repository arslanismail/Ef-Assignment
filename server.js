const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const session = require('express-session');
const bodyParser = require("body-parser");
const mainRoutes = require("./routes/router");
const redisClient = require('./redis-client');
mongoose.connect("mongodb://mongo:27017/assignment", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});
global.appSession;

const db = mongoose.connection;
db.on("error", (err) => {
  console.log("Db Connection Error: ", err);
});

db.once("open", () => {
  console.log("Database Connection Established");
});

const app = express();
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({secret: 'ssshhhhh',saveUninitialized: true,resave: true}));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Servier is running on ${port}`);
});
app.get("/store/:key", async (req, res) => {
  const { key } = req.params;
  const { value } = req.query;
  await redisClient.setAsync(key, JSON.stringify(value));
  return res.send("Success");
});
app.get("/:key", async (req, res) => {
  const { key } = req.params;
  const rawData = await redisClient.getAsync(key);
  return res.json(JSON.parse(rawData));
});

app.use("/api", mainRoutes);
