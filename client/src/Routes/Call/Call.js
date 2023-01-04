import React, { useState, useEffect, useReducer } from "react";
import { Routes, Route, Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Call.css";

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
          `https://roadangels.onrender.com/api/calls/${params.callId}`

          // `http://localhost:5000/api/calls/${params.callId}`
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
        `https://roadangels.onrender.com/api/updatecall/${params.callId}`,

        // `http://localhost:5000/api/updatecall/${params.callId}`,
        detailsObj
      );

      setIsLoading(false);
      navigate("/opencalls");
    } catch (e) {
      setErrorMes(e.message);
    }
  };
  return (
    <div className="ec main">
      <h1>Edit Call</h1>
      <div className="ec card-group mb-10">
        {isLoading && <h1 className="">Spinner</h1>}
        {errorMes && <h2>{errorMes}</h2>}
        {callObj && (
          <div className="ec mb-10">
            <div className="ec card mb-10 p-3">
              <p>
                {" "}
                OpeningTime -{" "}
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
                Mail -{" "}
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
                Phone -{" "}
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
                City -{" "}
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
                Region -{" "}
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

              <button
                className="ec btn btn-primary btn-block mb-4"
                onClick={handlerSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Call;
