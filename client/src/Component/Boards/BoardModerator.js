import React, { useState, useEffect } from "react";

import UserService from "../../services/user.service";
import EventBus from "../../common/EventBus";
import VolunteerNav from "../VolunteerNav/VolunteerNav";
import { useNavigate } from "react-router-dom";
import "./Boards.css";

const BoardModerator = () => {
  const [content, setContent] = useState("");
  const navigate = useNavigate;
  useEffect(() => {
    UserService.getModeratorBoard().then(
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
      {content === "Volunteer Content." ? <VolunteerNav /> : ""}
      <div className="content ba">
        <div>
          <button
            className="ba btn btn-success btn-block mb-4 m-5 p-3"
            onClick={() => {
              navigate("/opencallsvol");
            }}
          >
            Open Calls
          </button>
        </div>
        <div>
          <button
            className="ba btn btn-primary btn-block mb-4 m-5 p-3"
            onClick={() => {
              navigate("/callstaken");
            }}
          >
            Calls Taken
          </button>
        </div>
      </div>
    </div>
  );
};

export default BoardModerator;
