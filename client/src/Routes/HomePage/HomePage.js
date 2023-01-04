import React from "react";
import {
  Routes,
  Route,
  Link,
  useParams,
  Navigate,
  useNavigate,
} from "react-router-dom";
import CitiesBar from "../../Component/CitiesBar/CitiesBar";
import bg1 from "./assets/imgs/bg1.jpg";
import styles from "./HomePage.css";

function HomePage() {
  const navigate = useNavigate();
  return (
    <div className="main-page">
      <div className="left-side">
        <h1>RoadAngels</h1>
        {/* <CitiesBar /> */}
        <p>
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters, as opposed to using 'Content here, content here', making it
          look like readable English. Many desktop publishing packages and web
          page editors now use Lorem Ipsum as their default model text, and a
          search for 'lorem ipsum' will uncover many web sites still in their
          infancy. Various versions have evolved over the years, sometimes by
          accident, sometimes on purpose (injected humour and the like).
        </p>
      </div>
      <div className="right-side">
        <button
          className="onc btn btn-success btn-block mb-4 m-5 p-3"
          onClick={() => {
            navigate("/opennewcall");
          }}
        >
          Open New Call
        </button>
        <button
          className="lr btn btn-primary btn-block mb-4 m-5 p-3"
          onClick={() => {
            navigate("/login");
          }}
        >
          Login/Register
        </button>
      </div>
    </div>
  );
}

export default HomePage;
