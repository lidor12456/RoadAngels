import React, { useState, useEffect, useReducer } from "react";
import { Routes, Route, Link, useParams } from "react-router-dom";
import axios from "axios";
import styles from "./VolunteerNav.css";
import "bootstrap/dist/css/bootstrap.min.css";

function VolunteerNav() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="navbar-nav mr-auto ml-auto">
          {/* <ul className="nav__ul"> */}
          <li className="nav-item">
            <Link to="/opencalls" className="nav-link">
              Open Calls
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/callstaken" className="nav-link">
              Calls Taken
            </Link>
          </li>
          <li className="nav-item">Hello Volunteer</li>
          {/* </ul> */}
        </div>
      </nav>
    </div>
  );
}

export default VolunteerNav;
