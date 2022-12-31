import React, { useState, useEffect, useReducer } from "react";
import { Routes, Route, Link, useParams, useNavigate } from "react-router-dom";

import axios from "axios";

function AddVolunteer() {
  const [detailsObj, setDetailsObj] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [errorMes, setErrorMes] = useState(null);
  const navigate = useNavigate();

  const handlerSubmitForm = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        // "https://roadangels.onrender.com/api/adduser"

        `http://localhost:5000/api/adduser`,
        detailsObj
      );

      setIsLoading(false);
      navigate("/volunteers");
    } catch (e) {
      setErrorMes(e.message);
    }
  };

  return (
    <div className="user-form">
      {isLoading && <h1 className="">Spinner</h1>}
      {errorMes && <h2>{errorMes}</h2>}
      <h1>Add Volunteer</h1>
      <p>
        {" "}
        role -{" "}
        <input
          onChange={({ target: { value } }) => {
            setDetailsObj((prev) => {
              const updateState = { ...prev };

              updateState.role = value;
              return updateState;
            });
          }}
        ></input>
      </p>

      <p>
        {" "}
        name -{" "}
        <input
          onChange={({ target: { value } }) => {
            setDetailsObj((prev) => {
              const updateState = { ...prev };

              updateState.name = value;
              return updateState;
            });
          }}
        ></input>
      </p>
      <p>
        {" "}
        mail -{" "}
        <input
          onChange={({ target: { value } }) => {
            setDetailsObj((prev) => {
              const updateState = { ...prev };

              updateState.mail = value;
              return updateState;
            });
          }}
        ></input>
      </p>
      <p>
        {" "}
        phone -{" "}
        <input
          onChange={({ target: { value } }) => {
            setDetailsObj((prev) => {
              const updateState = { ...prev };

              updateState.phone = value;
              return updateState;
            });
          }}
        ></input>
      </p>
      <p>
        {" "}
        city -{" "}
        <input
          onChange={({ target: { value } }) => {
            setDetailsObj((prev) => {
              const updateState = { ...prev };

              updateState.city = value;
              return updateState;
            });
          }}
        ></input>
      </p>
      <p>
        {" "}
        region -{" "}
        <input
          onChange={({ target: { value } }) => {
            setDetailsObj((prev) => {
              const updateState = { ...prev };

              updateState.region = value;
              return updateState;
            });
          }}
        ></input>
      </p>
      <button onClick={handlerSubmitForm}>Submit Volunteer</button>
    </div>
  );
}

export default AddVolunteer;
