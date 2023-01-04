const {
  addUserToMongo,
  addCallToMongo,
} = require("../services/users.mongoose.js");
const { Users } = require("../models/user.model.js");
const { Calls } = require("../models/call.model.js");

const getAllUsers = async (req, res) => {
  try {
    const users = await Users.find({});
    res.status(200).send(users);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
};

const getAllCalls = async (req, res) => {
  try {
    const calls = await Calls.find({});
    res.status(200).send(calls);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
};
const getAllNotDeletedCalls = async (req, res) => {
  try {
    const calls = await Calls.find({ isDeleted: false });
    res.status(200).send(calls);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
};

const addUser = async (req, res) => {
  const body = req.body;
  // console.log(body);

  const newUser = await addUserToMongo(body);
  res.status(201).send(newUser);
};
const addCall = async (req, res) => {
  const body = req.body;
  // console.log(body);

  const newCall = await addCallToMongo(body);
  res.status(201).send(newCall);
};

const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await Users.findById(id);
    res.status(200).send(user);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
};
const getCallById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await Calls.findById(id);
    res.status(200).send(user);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
};

const updateUserById = async (req, res) => {
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
// TODO : finish this route
const updateUserArrayById = async (req, res) => {
  const { id } = req.params;

  const takenCallsArr = req.body;

  try {
    console.log(req.body.takenCalls);
    const updatedData = await Users.findByIdAndUpdate(
      id,
      takenCallsArr.push(req.body.takenCalls),
      { new: true }
    );
    res.status(201).send(updatedData);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
};
const updateCallById = async (req, res) => {
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
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    await Users.findByIdAndRemove(id);
    res.status(200).send({ message: "User deleted successfully" });
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
};
module.exports = {
  getAllUsers,
  getAllCalls,
  addUser,
  addCall,
  getUserById,
  updateUserById,
  updateUserArrayById,
  deleteUser,
  getCallById,
  updateCallById,
  getAllNotDeletedCalls,
};
