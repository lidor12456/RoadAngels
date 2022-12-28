import React, { useState, useEffect, useReducer } from "react";
import { Routes, Route, Link, useParams } from "react-router-dom";
import axios from "axios";
import styles from "./GeneralNav.css";

function GeneralNav() {
  return (
    <div>
      <div className="nav">
        <ul className="nav__ul">
          <li className="nav__li logo">logo</li>
          <li className="nav__li">
            <Link to="/opennewcall">Open New Call</Link>
          </li>
          <li className="nav__li">
            <Link to="/login">login</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default GeneralNav;
