import { Users, Calls } from "../models/user.model.js";

export const addUserToMongo = async (userObj) => {
  const newUser = await Users.create(userObj);
  //   const newUser = new User(userObj); // sync
  //   newUser.save(); //async
  // User.printSome();
  // newUser.instanceOf();
  return newUser;
};
