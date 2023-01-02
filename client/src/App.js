import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import { useFetch } from "./Component/hooks/useFetch";
import { Routes, Route, Link, useParams, Navigate } from "react-router-dom";

import IndexRoutes from "./IndexRoutes";
import GeneralNav from "./Component/GeneralNav/GeneralNav";
import AdminNav from "./Component/AdminNav/AdminNav";
import VolunteerNav from "./Component/VolunteerNav/VolunteerNav";

/**/
import TestLogin from "./Component/TestLogin/TestLogin";
// import "bootstrap/dist/css/bootstrap.min.css";
// import AuthService from "./services/auth.service";

// import Login from "./components/Login";
// import Register from "./components/Register";
// import Home from "./components/Home";
// import Profile from "./components/Profile";
// import BoardUser from "./components/BoardUser";
// import BoardModerator from "./components/BoardModerator";
// import BoardAdmin from "./components/BoardAdmin";

// import EventBus from "./common/EventBus";
/**/
function App() {
  const [isAdminLogged, setIsAdminLogged] = useState(true);
  const [isVolunteerLogged, setIsVolunteerLogged] = useState(false);
  return (
    <div className="App">
      {isAdminLogged && <AdminNav />}
      {isVolunteerLogged && <VolunteerNav />}
      {!isVolunteerLogged && !isAdminLogged ? <GeneralNav /> : ""}
      <IndexRoutes />
      <TestLogin />
    </div>
  );
}

export default App;
