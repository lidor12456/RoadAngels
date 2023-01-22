import React, { useState, useEffect, useReducer } from "react";
import { Routes, Route, Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./OpenNewCall.css";
//
function OpenNewCall() {
  const [detailsObj, setDetailsObj] = useState({});
  const [citiesState, setCitiesState] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMes, setErrorMes] = useState(null);
  const navigate = useNavigate();

  const handlerSubmitForm = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        "https://roadangels.onrender.com/api/addcall",

        // `http://localhost:5000/api/addcall`,
        detailsObj
      );

      setIsLoading(false);
      // TODO: NAVIGATE TO SOMEWHERE ELSE MORE USEFUL
      navigate("/");
    } catch (e) {
      setErrorMes(e.message);
    }
  };
  useEffect(() => {
    const govData = async () => {
      const { data } = await axios.get(
        "https://data.gov.il/api/3/action/datastore_search?resource_id=d4901968-dad3-4845-a9b0-a57d027f11ab",
        {
          params: { q: "", language: "english", limit: 3200 },
          responseType: "json",
        }
      );

      let citiesNamesArr = data.result.records.map((city) => city.שם_ישוב);
      setCitiesState(citiesNamesArr);
    };
    govData();
  }, []);

  return (
    <div className="open-call-form col-md-12">
      {isLoading && <h1 className="spinner">Spinner</h1>}
      {errorMes && <h2>{errorMes}</h2>}
      <h1>Open New Call</h1>
      <div className="onc form-group">
        <div className="onc card mb-10">
          <p>
            {" "}
            Subject -{" "}
            <input
              onChange={({ target: { value } }) => {
                setDetailsObj((prev) => {
                  const updateState = { ...prev };

                  updateState.subject = value;
                  updateState.isDeleted = false;
                  const event = new Date();
                  const jsonDate = event.toUTCString();
                  updateState.openingTime = jsonDate.toString();

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
        </div>
        <div className="onc card mb-10">
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
            City -
            <select
              onChange={({ target: { value } }) => {
                setDetailsObj((prev) => {
                  const updateState = { ...prev };

                  updateState.city = value;
                  console.log(updateState);
                  return updateState;
                });
              }}
            >
              <option value="Select City ⬇️">-- Select city --</option>

              {citiesState &&
                citiesState.map((city) => <option value={city}>{city}</option>)}
            </select>
            {/* <input
              onChange={({ target: { value } }) => {
                setDetailsObj((prev) => {
                  const updateState = { ...prev };

                  updateState.city = value;
                  return updateState;
                });
              }}
            ></input> */}
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
        </div>
      </div>
      <button
        className="onc btn btn-primary btn-block mb-4"
        onClick={() => {
          console.log(detailsObj);
          handlerSubmitForm();
        }}
      >
        Submit Call
      </button>
    </div>
  );
}

export default OpenNewCall;
