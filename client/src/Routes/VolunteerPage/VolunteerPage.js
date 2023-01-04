import React, { useState, useEffect, useReducer } from "react";
import { Routes, Route, Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./VolunteerPage.css";

function VolunteerPage() {
  const [volunteerArr, setVolunteerArr] = useState([]);
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
          `https://roadangels.onrender.com/api/users/${params.volunteerId}`

          // `http://localhost:5000/api/users/${params.volunteerId}`
        );
        console.log(data);
        setVolunteerArr([data]);
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
        `https://roadangels.onrender.com/api/updateuser/${params.volunteerId}`,

        // `http://localhost:5000/api/updateuser/${params.volunteerId}`,
        detailsObj
      );

      setIsLoading(false);
      navigate("/volunteers");
    } catch (e) {
      setErrorMes(e.message);
    }
  };
  return (
    <div>
      <div className="vp card-group main-container">
        {/* <h1>{volunteerArr[0] && volunteerArr[0].name}</h1> */}
        {isLoading && <h1 className="spinner">Spinner</h1>}
        {errorMes && <h2>{errorMes}</h2>}

        {setVolunteerArr.length && (
          <div className="card-group">
            {volunteerArr.map(
              (
                { _id, name, role, takenCalls, email, phone, city, region },
                mapIndex
              ) => (
                <div className="card-group mb-10" key={_id}>
                  {console.log(volunteerArr)}
                  <div className="vp card mb-10">
                    {/* <p>
                      {" "}
                      Role -{" "}
                      <input
                        placeholder={role}
                        onChange={({ target: { value } }) => {
                          setDetailsObj((prev) => {
                            const updateState = { ...prev };

                            updateState.role = value;
                            return updateState;
                          });
                        }}
                      ></input>
                    </p> */}

                    <p>
                      {" "}
                      Name -{" "}
                      <input
                        placeholder={name}
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
                        placeholder={email}
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
                        placeholder={phone}
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
                        placeholder={city}
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
                        placeholder={region}
                        onChange={({ target: { value } }) => {
                          setDetailsObj((prev) => {
                            const updateState = { ...prev };

                            updateState.region = value;
                            return updateState;
                          });
                        }}
                      ></input>
                    </p>
                    <p>Taken Calls -{takenCalls.length}</p>
                  </div>
                  <button
                    className="vp btn btn-primary btn-block mb-4"
                    onClick={handlerSubmit}
                  >
                    Submit
                  </button>
                </div>
              )
            )}

            <br></br>
          </div>
        )}
      </div>
    </div>
  );
}

export default VolunteerPage;
