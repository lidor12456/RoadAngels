const mongoose = require("mongoose");

const CallsSchema = new mongoose.Schema({
  openingTime: { type: String },
  subject: { type: String },
  name: { type: String },
  mail: { type: String },
  phone: { type: String },
  city: { type: String },
  region: { type: String },
  isDeleted: { type: Boolean },
});

// userSchema.statics.printSome = function () {
//   console.log({ printSome: this });
// };

// userSchema.methods.instanceOf = function () {
//   console.log({ instanceOf: this });
// };

const Calls = mongoose.model("Calls", CallsSchema);

module.exports = {
  Calls,
};
