// import mongoose from "mongoose";

// mongoose.connect("mongodb://127.0.0.1/BankApi", (error, mongoConnection) => {
//   if (error) {
//     console.log(error);
//   }
//   if (!process.env.NODE_ENV) {
//     const { host, port, name } = mongoConnection;
//     console.log({ host, port, name });
//   }
// });
const initial = require("../app.js");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

// `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.xdyb6xu.mongodb.net/?retryWrites=true&w=majority`;

const URL = `mongodb+srv://lidor_ashush:RCkVruXeEHtyj7WJ@cluster0.tfruplp.mongodb.net/users?retryWrites=true&w=majority`;
mongoose.connect(URL, (err, mongoDbInstance) => {
  if (err) {
    throw Error("MongoDB connection error: " + err);
  }
  const { host, port, name } = mongoDbInstance;
  // console.log(initial());
  console.log({ host, port, name });
});
