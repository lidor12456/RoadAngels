import { Router } from "express";
import cors from "cors";
import {
  getAllUsers,
  addUser,
  getUserById,
  updateUserById,
  transferCash,
  deleteUser,
  depotsCash,
} from "../controllers/users.controller.js";
import { userAuth } from "../middlewares/auth.middleware.js";
export const indexRoute = Router();

indexRoute.get("/allusers", cors(), getAllUsers);
indexRoute.get("/:id", cors(), getUserById);
indexRoute.post("/adduser", cors(), addUser);
indexRoute.put("/update/:id", cors(), updateUserById);
indexRoute.put("/depots/:id", cors(), depotsCash);
indexRoute.post("/transfercash/:firstId/:secondId", cors(), transferCash);
indexRoute.delete("/delete/:id", cors(), deleteUser);
