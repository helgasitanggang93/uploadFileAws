require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const port = 3000;
const imageRoutes = require("./routes");
const mongoose = require("mongoose");
const uri = 'mongodb://localhost:27017/aws-upload';
const errHandler = require("./helpers/errHandler");
mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);
mongoose.connect(uri, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log(`${uri} successfully conected`);
  }
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use("/api", imageRoutes);
app.use((err, req, res, next) => {
  const errorDetail = errHandler(err);
  res.status(errorDetail.status).json(errorDetail.message);
});
app.listen(port, function() {
  console.log(`Listening to Port ${port}`);
});

module.exports = app;
