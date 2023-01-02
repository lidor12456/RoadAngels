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
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const db = {};

db.mongoose = mongoose;

db.user = require("../models/user.model");
db.role = require("../models/role.model");
const { Users } = require("../models/user.model.js");
const { Role } = require("../models/role.model.js");

db.ROLES = ["user", "admin", "moderator"];
// console.log(db);
module.exports = {
  db,
};
function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "moderator",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: "admin",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}

// `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.xdyb6xu.mongodb.net/?retryWrites=true&w=majority`;

const URL = `mongodb+srv://lidor_ashush:RCkVruXeEHtyj7WJ@cluster0.tfruplp.mongodb.net/users?retryWrites=true&w=majority`;
mongoose.connect(URL, (err, mongoDbInstance) => {
  initial();
  if (err) {
    throw Error("MongoDB connection error: " + err);
  }
  const { host, port, name } = mongoDbInstance;

  console.log({ host, port, name });
});
