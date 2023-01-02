const { Users } = require("../models/user.model.js");
const { Calls } = require("../models/call.model.js");

const addUserToMongo = async (userObj) => {
  const newUser = await Users.create(userObj);
  //   const newUser = new User(userObj); // sync
  //   newUser.save(); //async
  // User.printSome();
  // newUser.instanceOf();
  return newUser;
};
const addCallToMongo = async (userObj) => {
  const newCall = await Calls.create(userObj);
  //   const newUser = new User(userObj); // sync
  //   newUser.save(); //async
  // User.printSome();
  // newUser.instanceOf();
  return newCall;
};
module.exports = {
  addUserToMongo,
  addCallToMongo,
};
