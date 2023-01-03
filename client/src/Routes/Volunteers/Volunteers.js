import React, { useState, useEffect, useReducer } from "react";
import { Routes, Route, Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Volunteers.css";

function Volunteers() {
  const [volunteersArr, setVolunteersArr] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMes, setErrorMes] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          // "https://roadangels.onrender.com/api/allusers"

          "http://localhost:5000/api/allusers"
        );
        console.log(data);
        setVolunteersArr(data);
        setIsLoading(false);
      } catch (e) {
        setErrorMes(e.message);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="users">
      <h1>Volunteers</h1>
      {errorMes && <h2>{errorMes}</h2>}

      {isLoading && <h1 className="">Spinner</h1>}
      {setVolunteersArr.length && (
        <div className="users-container">
          {volunteersArr.map(
            (
              { _id, name, role, takenCalls, email, phone, city, region },
              mapIndex
            ) => (
              <div className="user" key={_id}>
                {console.log(volunteersArr)}
                <div className="user-info">
                  <p> role - {role}</p>
                  <p> takenCalls - {takenCalls.length}</p>
                  <p> Name - {name}</p>
                  <p> mail - {email}</p>
                  <p> phone - {`0${phone}`}</p>
                  <p> city - {city}</p>
                  <p> region - {region}</p>
                  <Link to={`/volunteers/${_id}`}>
                    <button className="edit-btn">edit</button>
                  </Link>
                </div>
              </div>
            )
          )}
        </div>
      )}
      <button
        onClick={() => {
          navigate("/volunteer/addvolunteer");
        }}
      >
        Add Volunteer
      </button>
    </div>
  );
}

export default Volunteers;
