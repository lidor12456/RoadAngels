import React, { useState, useEffect, useReducer } from "react";
import { Routes, Route, Link, useParams } from "react-router-dom";
import "./AdminNav.css";

function AdminNav() {
  return (
    // <div>
    //   <div className="nav">
    //     <ul className="nav__ul">
    //       <li className="nav__li logo">logo</li>
    //       <li className="nav__li">
    //         <Link to="/opencalls">Open Calls</Link>
    //       </li>
    //       <li className="nav__li">
    //         <Link to="/volunteers">Volunteers</Link>
    //       </li>
    //       <li className="">Hello Admin</li>
    //     </ul>
    //   </div>
    // </div>
    <div className="admin-nav">
      <nav className="navbar navbar-expand navbar-dark bg-primary ">
        <div className="navbar-nav ml-auto ">
          <li className="nav-item dark">
            <Link to="/opencalls" className="nav-link">
              Open Calls
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/volunteers" className="nav-link">
              Volunteers
            </Link>
          </li>
        </div>
      </nav>
    </div>
  );
}

export default AdminNav;
