import React from "react";
import { Routes, Route, Link, useParams, Navigate } from "react-router-dom";
import OpenNewCall from "./Routes/OpenNewCall/OpenNewCall";
import Login from "./Routes/Login/Login";
import OpenCalls from "./Routes/OpenCalls/OpenCalls";
import CallsTaken from "./Routes/CallsTaken/CallsTaken";
import Volunteers from "./Routes/Volunteers/Volunteers";
import HomePage from "./Routes/HomePage/HomePage";
import E404 from "./Routes/E404/E404";
import VolunteerPage from "./Routes/VolunteerPage/VolunteerPage";
import AddVolunteer from "./Routes/AddVolunteer/AddVolunteer";
import Call from "./Routes/Call/Call";

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

      <Route path="*" element={<E404 />} />
    </Routes>
  );
}

export default IndexRoutes;
