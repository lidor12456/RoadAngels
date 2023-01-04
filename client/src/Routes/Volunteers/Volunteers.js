import React, { useState, useEffect, useReducer } from "react";
import { Routes, Route, Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Volunteers.css";
import UserService from "../../services/user.service";
import EventBus from "../../common/EventBus";
import "bootstrap/dist/css/bootstrap.min.css";

function Volunteers() {
  const [content, setContent] = useState("");

  const [volunteersArr, setVolunteersArr] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMes, setErrorMes] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setContent(null);
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          "https://roadangels.onrender.com/api/allusers"

          // "http://localhost:5000/api/allusers"
        );
        console.log(data);
        setVolunteersArr(data);
        setIsLoading(false);
      } catch (e) {
        setErrorMes(e.message);
      }

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
  }, []);

  return (
    <div className="vs card-group main-container">
      {isLoading && <h1 className="spinner">Spinner</h1>}

      {content == "Volunteer Content." || content == "Admin Content." ? (
        <div>
          <h1>Volunteers</h1>
          {console.log(content)}
          {errorMes && <h2>{errorMes}</h2>}
          {isLoading && <h1 className="spinner">Spinner</h1>}
          {setVolunteersArr.length && (
            <div className="vs card-group">
              {volunteersArr.map(
                (
                  { _id, name, role, takenCalls, email, phone, city, region },
                  mapIndex
                ) => (
                  <div className="vs card-group mb-10" key={_id}>
                    {console.log(volunteersArr)}
                    <div className="vs card mb-10">
                      <p> Taken Calls - {takenCalls.length}</p>
                      <p> Name - {name}</p>
                      <p> Mail - {email}</p>
                      <p> Phone - {`0${phone}`}</p>
                      <p> City - {city}</p>
                      <p> Region - {region}</p>
                      <Link to={`/volunteers/${_id}`}>
                        <button className="vs btn btn-primary btn-block mb-4 edit-btn">
                          Edit
                        </button>
                      </Link>
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

export default Volunteers;
