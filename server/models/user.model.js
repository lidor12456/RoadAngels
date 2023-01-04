const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema({
  username: { type: String },
  roles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
    },
  ],
  email: { type: String },
  password: { type: String },
  name: { type: String },
  phone: { type: Number },
  city: { type: String },
  region: { type: String },
  takenCalls: { type: Array },
  isDeleted: { type: Boolean },
});

const Users = mongoose.model("Users", UsersSchema);

module.exports = {
  Users,
};

// const mongoose = require("mongoose");

// const Users = mongoose.model(
//   "Users",
//   new mongoose.Schema({
//     username: String,
//     email: String,
//     password: String,
//     roles: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Role",
//       },
//     ],
//   })
// );

// module.exports = Users;
