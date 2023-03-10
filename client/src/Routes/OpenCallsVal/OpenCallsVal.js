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
import "./OpenCallsVal.css";
import UserService from "../../services/user.service";
import AuthService from "../../services/auth.service";

import EventBus from "../../common/EventBus";

function OpenCallsVal() {
  const [currentUser, setCurrentUser] = useState(undefined);

  const [content, setContent] = useState("");
  const [callsArr, setCallsArr] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMes, setErrorMes] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = AuthService.getCurrentUser();
        if (user) {
          setCurrentUser(user);
        }
        setIsLoading(true);
        const { data } = await axios.get(
          // `http://localhost:5000/api/notdeletedcalls`
          "https://roadangels.onrender.com/api/notdeletedcalls"
        );
        console.log(data);
        setCallsArr(data);
        setIsLoading(false);
      } catch (e) {
        setErrorMes(e.message);
      }
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

  //!TODO
  const addCallToArr = async (callId) => {
    const userId = currentUser.id;
    try {
      setIsLoading(true);
      const { data } = await axios.put(
        `https://roadangels.onrender.com/api/updateuserarray/${userId}`,

        // `http://localhost:5000/api/updateuserarray/${userId}`,
        { takenCalls: callId }
      );
      console.log(callsArr);
      setCallsArr((prev) => {
        return prev.filter(({ _id }) => _id !== callId);
      });
      // test
      setIsLoading(false);
    } catch (e) {
      setErrorMes(e.message);
    }
  };
  //   const handlerTake = async (id) => {
  //     try {
  //       addCallToArr(id);
  //       // console.log(currentUser);
  //       setIsLoading(true);
  //       const { data } = await axios.put(
  //         // "https://roadangels.onrender.com/api/updatecall/${id}"

  //         `http://localhost:5000/api/updatecall/${id}`,
  //         { isDeleted: true }
  //       );

  //       setIsLoading(false);
  //     } catch (e) {
  //       setErrorMes(e.message);
  //     }
  //   };

  return (
    <div className="ocv card-group main-container">
      {console.log(content)}
      {content == "Volunteer Content." || content == "Admin Content." ? (
        <div>
          <h1>
            Open Calls &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;- &nbsp; &nbsp;
            Volunteer Area
          </h1>
          {errorMes && <h2>{errorMes}</h2>}

          {isLoading && <h1 className="spinner">Spinner</h1>}
          {setCallsArr.length && (
            <div className="card-group">
              {callsArr.map(
                (
                  {
                    _id,
                    name,
                    openingTime,
                    subject,
                    mail,
                    phone,
                    city,
                    region,
                    isDeleted,
                  },
                  mapIndex
                ) => (
                  <div className="card-group mb-10">
                    {/* {console.log(callsArr)} */}
                    <div className="ocv card mb-10" key={_id}>
                      <p> Subject - {subject}</p>
                      <p> Name - {name}</p>
                      <p> Mail - {mail}</p>
                      <p> Phone - {phone}</p>
                      <p> City - {city}</p>
                      <p> Region - {region}</p>
                      <small className="text-muted mb-3">
                        <p>Opening Time - {openingTime}</p>
                      </small>
                      <Link to={`/opencalls/${_id}`}>
                        {/* <button className="btn btn-primary btn-block mb-4">
                          Edit
                        </button> */}
                      </Link>
                      <button
                        className="btn btn-success btn-block mb-4"
                        onClick={() => {
                          {
                            errorMes && <h2>{errorMes}</h2>;
                          }

                          {
                            isLoading && <h1 className="">Spinner</h1>;
                          }
                          addCallToArr(_id);
                        }}
                      >
                        Take
                      </button>
                    </div>
                  </div>
                )
              )}
            </div>
          )}
        </div>
      ) : (
        "no access"
      )}
    </div>
  );
}

export default OpenCallsVal;
