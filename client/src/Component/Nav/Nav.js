import React, { useState, useEffect, useReducer } from "react";
import { Routes, Route, Link, useParams } from "react-router-dom";
import axios from "axios";
import styles from "./Nav.css";

function Nav() {
  return (
    <div>
      <div className="nav">
        <ul className="nav__ul">
          {/* <li className="nav__li logo">FindTfila</li> */}
          <li className="nav__li">
            <Link to="/">Search Page</Link>
          </li>
          <li className="nav__li">
            <Link to="/addsynagoge">Add Synagoge</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Nav;
