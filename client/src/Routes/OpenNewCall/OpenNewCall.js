import React, { useState, useEffect, useReducer } from "react";
import { Routes, Route, Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function OpenNewCall() {
  const [detailsObj, setDetailsObj] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [errorMes, setErrorMes] = useState(null);
  const navigate = useNavigate();

  const updateDateAndTime = () => {
    const event = new Date();
    const jsonDate = event.toUTCString();
    setDetailsObj((prev) => {
      const updateState = { ...prev };

      updateState.openingTime = `${jsonDate}`;
      // updateState.openingTime = `2012`;
      console.log(detailsObj);
      console.log(jsonDate);

      return updateState;
    });
  };
  const handlerSubmitForm = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        // "https://roadangels.onrender.com/api/addcall"

        `http://localhost:5000/api/addcall`,
        detailsObj
      );

      setIsLoading(false);
      // // TODO: NAVIGATE TO SOMEWHERE ELSE MORE USEFUL
      // navigate("/");
    } catch (e) {
      setErrorMes(e.message);
    }
  };

  return (
    <div className="open-call-form">
      {isLoading && <h1 className="">Spinner</h1>}
      {errorMes && <h2>{errorMes}</h2>}
      <h1>Open New Call</h1>
      <p>
        {" "}
        Subject -{" "}
        <input
          onChange={({ target: { value } }) => {
            setDetailsObj((prev) => {
              const updateState = { ...prev };

              updateState.subject = value;
              return updateState;
            });
          }}
        ></input>
      </p>

      <p>
        {" "}
        Name -{" "}
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
        Mail -{" "}
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
        Phone -{" "}
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
        City -{" "}
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
        Region -{" "}
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
      <button
        onClick={() => {
          updateDateAndTime();
          handlerSubmitForm();
        }}
      >
        Submit Call
      </button>
    </div>
  );
}

export default OpenNewCall;
