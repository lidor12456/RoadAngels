import React, { useState, useEffect, useReducer } from "react";
import {
  Routes,
  Route,
  Link,
  useParams,
  Navigate,
  useNavigate,
} from "react-router-dom";
import axios from "axios";
// import "./OpenCalls.css";
import UserService from "../../services/user.service";
import AuthService from "../../services/auth.service";

import EventBus from "../../common/EventBus";

function CallsTaken() {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [content, setContent] = useState("");
  const [callsArr, setCallsArr] = useState([]);
  // const [callsArr, setCallsArr] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMes, setErrorMes] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = AuthService.getCurrentUser();
        if (user) {
          setCurrentUser(user);
        }
        setIsLoading(true);
        const { data } = await axios.get(
          `http://localhost:5000/api/users/${currentUser.id}`
          // "http://localhost:5000/api/users/${currentUser.id}"
        );
        setCallsArr(data);
        setIsLoading(false);
        const idList = data.takenCalls;
        console.log(idList);
        const userCalls = [];
        for (let i = 0; i < data.takenCalls.length; i++) {
          const { userCallsData } = await axios.get(
            `http://localhost:5000/api/calls/${idList[i]}`
            // "http://localhost:5000/api/calls/${currentUser.id}"
          );
          // console.log(userCallsData);

          setCallsArr((prev) => {
            return [userCallsData];
          });
        }
        console.log(callsArr);
      } catch (e) {
        setErrorMes(e.message);
      }

      // await axios.get(
      //   `http://localhost:5000/api/users/${currentUser.id}`
      //   // "http://localhost:5000/api/users/${currentUser.id}"
      // );

      UserService.getModeratorBoard().then(
        (response) => {
          setContent(response.data);
          console.log(response);
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
    };
    fetchData();
  }, []);

  return (
    <div>
      {content == "Volunteer Content." || content == "Admin Content." ? (
        <div>CallsTaken</div>
      ) : (
        "no access"
      )}
    </div>
  );
}
export default CallsTaken;
