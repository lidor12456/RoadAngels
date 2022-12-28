import React, { useState, useEffect, useReducer } from "react";
import { Routes, Route, Link, useParams } from "react-router-dom";
import axios from "axios";
import styles from "./VolunteerNav.css";

function VolunteerNav() {
  return (
    <div>
      <div className="nav">
        <ul className="nav__ul">
          <li className="nav__li logo">logo</li>
          <li className="nav__li">
            <Link to="/opencalls">Open Calls</Link>
          </li>
          <li className="nav__li">
            <Link to="/callstaken">Calls Taken</Link>
          </li>
          <li className="">Hello Volunteer</li>
        </ul>
      </div>
    </div>
  );
}

export default VolunteerNav;
