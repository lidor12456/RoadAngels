import React, { useState, useEffect, useReducer } from "react";
import { Routes, Route, Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function Call() {
  const [callObj, setCallObj] = useState([]);

  const [detailsObj, setDetailsObj] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [errorMes, setErrorMes] = useState(null);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          // "https://roadangels.onrender.com/api/calls/${params.callId}"

          `http://localhost:5000/api/calls/${params.callId}`
        );
        console.log(data);
        setCallObj(data);
        setIsLoading(false);
      } catch (e) {
        setErrorMes(e.message);
      }
    };
    fetchData();
  }, []);
  const handlerSubmit = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.put(
        // "https://roadangels.onrender.com/api/updatecall/${params.volunteerId}"

        `http://localhost:5000/api/updatecall/${params.callId}`,
        detailsObj
      );

      setIsLoading(false);
      navigate("/opencalls");
    } catch (e) {
      setErrorMes(e.message);
    }
  };
  return (
    <div className="call-form">
      {isLoading && <h1 className="">Spinner</h1>}
      {errorMes && <h2>{errorMes}</h2>}
      {callObj && (
        <div className="call-info">
          <p>
            {" "}
            openingTime -{" "}
            <input
              placeholder={callObj.openingTime}
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
            Name -{" "}
            <input
              placeholder={callObj.name}
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
              placeholder={callObj.mail}
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
              placeholder={callObj.phone}
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
              placeholder={callObj.city}
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
              placeholder={callObj.region}
              onChange={({ target: { value } }) => {
                setDetailsObj((prev) => {
                  const updateState = { ...prev };

                  updateState.region = value;
                  return updateState;
                });
              }}
            ></input>
          </p>
          <button onClick={handlerSubmit}>submit</button>
        </div>
      )}
    </div>
  );
}

export default Call;
