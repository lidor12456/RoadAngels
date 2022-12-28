import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import { useFetch } from "./Component/hooks/useFetch";
import { Routes, Route, Link, useParams, Navigate } from "react-router-dom";

import IndexRoutes from "./IndexRoutes";
import GeneralNav from "./Component/GeneralNav/GeneralNav";
import AdminNav from "./Component/AdminNav/AdminNav";
import VolunteerNav from "./Component/VolunteerNav/VolunteerNav";

function App() {
  const [isAdminLogged, setIsAdminLogged] = useState(false);
  const [isVolunteerLogged, setIsVolunteerLogged] = useState(false);
  return (
    <div className="App">
      {isAdminLogged && <AdminNav />}
      {isVolunteerLogged && <VolunteerNav />}
      {!isVolunteerLogged && !isAdminLogged ? <GeneralNav /> : ""}
      <IndexRoutes />
    </div>
  );
}

export default App;
