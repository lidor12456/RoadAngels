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
const CallsSchema = new mongoose.Schema({
  subject: { type: String },
  name: { type: String },
  role: { type: String },
  mail: { type: String },
  phone: { type: String },
  city: { type: String },
  region: { type: String },
  openTime: { type: String },
  isDeleted: { type: Boolean },
});

// userSchema.statics.printSome = function () {
//   console.log({ printSome: this });
// };

// userSchema.methods.instanceOf = function () {
//   console.log({ instanceOf: this });
// };

const Users = mongoose.model("Users", UsersSchema);
const Calls = mongoose.model("Calls", CallsSchema);

export { Users, Calls };
