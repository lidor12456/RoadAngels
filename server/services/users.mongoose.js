import { Users } from "../models/user.model.js";
import { Calls } from "../models/call.model.js";

export const addUserToMongo = async (userObj) => {
  const newUser = await Users.create(userObj);
  //   const newUser = new User(userObj); // sync
  //   newUser.save(); //async
  // User.printSome();
  // newUser.instanceOf();
  return newUser;
};
export const addCallToMongo = async (userObj) => {
  const newCall = await Calls.create(userObj);
  //   const newUser = new User(userObj); // sync
  //   newUser.save(); //async
  // User.printSome();
  // newUser.instanceOf();
  return newCall;
};
