const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema({
  name: { type: String },
  roles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
    },
  ],
  mail: { type: String },
  phone: { type: Number },
  city: { type: String },
  region: { type: String },
  takenCalls: { type: Array },
  isDeleted: { type: Boolean },
});

// userSchema.statics.printSome = function () {
//   console.log({ printSome: this });
// };

// userSchema.methods.instanceOf = function () {
//   console.log({ instanceOf: this });
// };

const Users = mongoose.model("Users", UsersSchema);

module.exports = {
  Users,
};
