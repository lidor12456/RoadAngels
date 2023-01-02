import { Router } from "express";
import cors from "cors";
import {
  getAllUsers,
  getAllCalls,
  addUser,
  addCall,
  getUserById,
  updateUserById,
  deleteUser,
  getCallById,
  updateCallById,
  getAllNotDeletedCalls,
  // transferCash,
  // depotsCash,
} from "../controllers/users.controller.js";
import { userAuth } from "../middlewares/auth.middleware.js";
export const indexRoute = Router();

indexRoute.get("/allusers", cors(), getAllUsers);
indexRoute.get("/allcalls", cors(), getAllCalls);
indexRoute.get("/notdeletedcalls", cors(), getAllNotDeletedCalls);
indexRoute.get("/users/:id", cors(), getUserById);
indexRoute.get("/calls/:id", cors(), getCallById);
indexRoute.post("/adduser", cors(), addUser);
indexRoute.post("/addcall", cors(), addCall);
indexRoute.put("/updateuser/:id", cors(), updateUserById);
indexRoute.put("/updatecall/:id", cors(), updateCallById);
// indexRoute.put("/depots/:id", cors(), depotsCash);
// indexRoute.post("/transfercash/:firstId/:secondId", cors(), transferCash);
indexRoute.delete("/delete/:id", cors(), deleteUser);
