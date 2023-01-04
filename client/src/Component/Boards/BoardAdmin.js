import React, { useState, useEffect } from "react";

import UserService from "../../services/user.service";
import EventBus from "../../common/EventBus";
import AdminNav from "../AdminNav/AdminNav";
import { useNavigate } from "react-router-dom";
import "./Boards.css";

const BoardAdmin = () => {
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    UserService.getAdminBoard().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }, []);

  return (
    <div className="container">
      {content === "Admin Content." ? <AdminNav /> : ""}
      {/* <header className="jumbotron">
        <h3>{content}</h3>
      </header> */}
      <div className="content ba">
        <div>
          <button
            className="ba btn btn-success btn-block mb-4 m-5 p-3"
            onClick={() => {
              navigate("/opencalls");
            }}
          >
            Open Calls
          </button>
        </div>
        <div>
          <button
            className="ba btn btn-primary btn-block mb-4 m-5 p-3"
            onClick={() => {
              navigate("/volunteers");
            }}
          >
            Watch Volunteers
          </button>
        </div>
      </div>
    </div>
  );
};

export default BoardAdmin;
