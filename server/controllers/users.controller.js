import { addUserToMongo, addCallToMongo } from "../services/users.mongoose.js";
import { Users } from "../models/user.model.js";
import { Calls } from "../models/call.model.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await Users.find({});
    res.status(200).send(users);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
};

export const getAllCalls = async (req, res) => {
  try {
    const calls = await Calls.find({});
    res.status(200).send(calls);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
};
export const getAllNotDeletedCalls = async (req, res) => {
  try {
    const calls = await Calls.find({ isDeleted: false });
    res.status(200).send(calls);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
};

export const addUser = async (req, res) => {
  const body = req.body;
  // console.log(body);

  const newUser = await addUserToMongo(body);
  res.status(201).send(newUser);
};
export const addCall = async (req, res) => {
  const body = req.body;
  // console.log(body);

  const newCall = await addCallToMongo(body);
  res.status(201).send(newCall);
};

export const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await Users.findById(id);
    res.status(200).send(user);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
};
export const getCallById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await Calls.findById(id);
    res.status(200).send(user);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
};

export const updateUserById = async (req, res) => {
  const { id } = req.params;
  const { role, takenCalls, name, mail, phone, city, region } = req.body;
  try {
    const updatedData = await Users.findByIdAndUpdate(
      id,
      { role, takenCalls, name, mail, phone, city, region },
      { new: true }
    );
    res.status(201).send(updatedData);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
};
export const updateCallById = async (req, res) => {
  const { id } = req.params;
  const { openingTime, subject, name, mail, phone, city, region, isDeleted } =
    req.body;
  try {
    const updatedData = await Calls.findByIdAndUpdate(
      id,
      { openingTime, subject, name, mail, phone, city, region, isDeleted },
      { new: true }
    );
    res.status(201).send(updatedData);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
};
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    await Users.findByIdAndRemove(id);
    res.status(200).send({ message: "User deleted successfully" });
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
};
// export const transferCash = async (req, res) => {
//   const { firstId } = req.params;
//   const { secondId } = req.params;

//   const transferredCash = +req.body.cash;
//   try {
//     let giver = await Users.findById(firstId);
//     let receiver = await Users.findById(secondId);

//     giver = await Users.findByIdAndUpdate(
//       firstId,
//       { cash: giver.cash - transferredCash },
//       { new: true }
//     );
//     receiver = await Users.findByIdAndUpdate(
//       secondId,
//       { cash: receiver.cash + transferredCash },
//       { new: true }
//     );
//     res.status(201).send(receiver);
//   } catch (error) {
//     res.status(404).send({ message: error.message });
//   }
// };

// export const depotsCash = async (req, res) => {
//   const { id } = req.params;
//   const DepotsCash = +req.body.cash;
//   try {
//     let userDepots = await Users.findById(id);
//     userDepots = await Users.findByIdAndUpdate(
//       id,
//       { cash: userDepots.cash + DepotsCash },
//       { new: true }
//     );
//     res.status(201).send(userDepots);
//   } catch {
//     res.status(404).send({ message: error.message });
//   }
// };
