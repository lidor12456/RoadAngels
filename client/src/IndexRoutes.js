import React from "react";
import { Routes, Route, Link, useParams, Navigate } from "react-router-dom";
import OpenNewCall from "./Routes/OpenNewCall/OpenNewCall";

import OpenCalls from "./Routes/OpenCalls/OpenCalls";
import CallsTaken from "./Routes/CallsTaken/CallsTaken";
import Volunteers from "./Routes/Volunteers/Volunteers";
import HomePage from "./Routes/HomePage/HomePage";
import E404 from "./Routes/E404/E404";
import VolunteerPage from "./Routes/VolunteerPage/VolunteerPage";
import AddVolunteer from "./Routes/AddVolunteer/AddVolunteer";
import Call from "./Routes/Call/Call";

import Login from "./Component/Login";
import Register from "./Component/Register";

import Profile from "./Component/Profile";
import BoardUser from "./Component/BoardUser";
import BoardModerator from "./Component/BoardModerator";
import BoardAdmin from "./Component/BoardAdmin";

function IndexRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route path="/login" element={<Login />} />
      <Route path="/opennewcall" element={<OpenNewCall />} />
      <Route path="/opencalls" element={<OpenCalls />} />
      <Route path="/opencalls/:callId" element={<Call />} />
      <Route path="/callstaken" element={<CallsTaken />} />
      <Route path="/volunteers" element={<Volunteers />} />
      <Route path="/volunteers/:volunteerId" element={<VolunteerPage />} />
      <Route path="/volunteer/addvolunteer" element={<AddVolunteer />} />

      {/* <Route path="/home" element={<Home />} /> */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/user" element={<BoardUser />} />
      <Route path="/mod" element={<BoardModerator />} />
      <Route path="/admin" element={<BoardAdmin />} />

      <Route path="*" element={<E404 />} />
    </Routes>
  );
}

export default IndexRoutes;
