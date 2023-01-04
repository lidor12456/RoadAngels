import React, { useState, useEffect, useReducer } from "react";
import { Routes, Route, Link, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./VolunteerNav.css";
function VolunteerNav() {
  return (
    <div className="vol-nav">
      <nav className="navbar navbar-expand navbar-dark bg-primary ">
        <div className="navbar-nav ml-auto ">
          <li className="nav-item dark">
            <Link to="/opencallsval" className="nav-link">
              Open Calls
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/callstaken" className="nav-link">
              Calls Taken
            </Link>
          </li>
        </div>
      </nav>
    </div>
  );
}

export default VolunteerNav;
