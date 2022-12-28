import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema({
  name: { type: String },
  role: { type: String },
  mail: { type: String },
  phone: { type: String },
  city: { type: String },
  region: { type: String },
  takenCalls: { type: String },
  isDeleted: { type: Boolean },
});

// userSchema.statics.printSome = function () {
//   console.log({ printSome: this });
// };

// userSchema.methods.instanceOf = function () {
//   console.log({ instanceOf: this });
// };

const Users = mongoose.model("Users", UsersSchema);

export { Users };
