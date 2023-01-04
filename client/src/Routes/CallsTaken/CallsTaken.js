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
import ComingSoon from "../ComingSoon/ComingSoon";

function CallsTaken() {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [content, setContent] = useState("");
  const [callsArr, setCallsArr] = useState([]);
  const [complete, setComplete] = useState(false);
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
        console.log(currentUser);
        const { data } = await axios.get(
          `http://localhost:5000/api/users/${currentUser.id}`
          // "http://localhost:5000/api/users/${currentUser.id}"
        );
        // console.log(data);

        setCallsArr(data.takenCalls);
        setIsLoading(false);
        const test = callsArr[1];
        // JSON.parse(test);
        console.log(callsArr);
        console.log(test);
        const userCalls = [];
        // for (let i = 0; i < callsArr.length; i++) {
        const { userCallsData } = await axios.get(
          `http://localhost:5000/api/calls/${test}`
          // "http://localhost:5000/api/calls/${currentUser.id}"
        );
        userCalls.push(userCallsData);

        // }
        console.log(userCalls);
      } catch (e) {
        setErrorMes(e.message);
        console.log(e.message);
      }

      // await axios.get(
      //   `http://localhost:5000/api/users/${currentUser.id}`
      //   // "http://localhost:5000/api/users/${currentUser.id}"
      // );

      UserService.getModeratorBoard().then(
        (response) => {
          setContent(response.data);
          // console.log(response);
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
      {complete ? (
        <div>
          {isLoading && <h1 className="spinner">Spinner</h1>}
          {errorMes && <h2>{errorMes}</h2>}

          {content == "Volunteer Content." || content == "Admin Content." ? (
            <div>
              {callsArr &&
                callsArr.map((call) => {
                  return <p>{call}</p>;
                })}
            </div>
          ) : (
            "no access"
          )}
        </div>
      ) : (
        <ComingSoon />
      )}
    </div>
  );
}
export default CallsTaken;
