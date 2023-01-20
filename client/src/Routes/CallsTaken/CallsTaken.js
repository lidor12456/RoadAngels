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
  const [fullCallsArr, setFullCallsArr] = useState([]);
  const [complete, setComplete] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMes, setErrorMes] = useState(null);

  let userCalls = [];
  // const getCurrentUser = async () => {
  //   setCurrentUser(JSON.parse(localStorage.getItem("user")));
  //   console.log(currentUser);
  //   console.log(currentUser.id);
  //   let { data } = await axios.get(
  //     `http://localhost:5000/api/users/${currentUser.id}`
  //     // "http://localhost:5000/api/users/${currentUser.id}"
  //   );
  //   console.log(data.takenCalls);
  //   setCallsArr(data.takenCalls);

  //   console.log(callsArr);
  // };

  // const getCalls = async () => {
  //   let userCalls = [];
  //   for (let i = 0; i < callsArr.length; i++) {
  //     let { data } = await axios.get(
  //       `http://localhost:5000/api/calls/${callsArr[i]}`
  //       // "http://localhost:5000/api/calls/${currentUser.id}"
  //     );
  //     // console.log(data);

  //     userCalls.push(data);
  //   }
  //   setFullCallsArr(userCalls);
  //   console.log(userCalls);
  // };

  useEffect(() => {
    const fetchData = async () => {
      const getCurrentUser = async () => {
        setCurrentUser(JSON.parse(localStorage.getItem("user")));
        console.log(currentUser);
        console.log(currentUser.id);
        let { data } = await axios.get(
          `http://localhost:5000/api/users/${currentUser.id}`
          // "http://localhost:5000/api/users/${currentUser.id}"
        );
        // console.log(data.takenCalls);
        setCallsArr(data.takenCalls);

        // console.log(callsArr);
      };
      getCurrentUser();

      const getCalls = async () => {
        let userCalls = [];
        for (let i = 0; i < callsArr.length; i++) {
          let { data } = await axios.get(
            `http://localhost:5000/api/calls/${callsArr[i]}`
            // "http://localhost:5000/api/calls/${currentUser.id}"
          );
          // console.log(data);

          userCalls.push(data);
        }
        setFullCallsArr(userCalls);
        // console.log(userCalls);
      };
      getCalls();
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
  }, [fullCallsArr]);

  return (
    <div>
      {complete ? (
        <div>
          {isLoading && <h1 className="spinner">Spinner</h1>}
          {errorMes && <h2>{errorMes}</h2>}

          {content == "Volunteer Content." || content == "Admin Content." ? (
            <div className="card-group">
              {fullCallsArr &&
                fullCallsArr.map(
                  ({
                    _id,
                    name,
                    openingTime,
                    subject,
                    mail,
                    phone,
                    city,
                    region,
                    isDeleted,
                  }) => {
                    return (
                      <div className="card-group mb-10">
                        <div className="card mb-10" key={_id}>
                          {/* <p>{call._id}</p> */}
                          <p>{subject}</p>
                          <p>{name}</p>
                          <p>{phone}</p>
                          <p>{city}</p>
                        </div>
                      </div>
                    );
                  }
                )}
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
