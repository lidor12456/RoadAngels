import React, { useState, useEffect, useReducer } from "react";
import { Routes, Route, Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

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
          // "https://roadangels.onrender.com/api/${params.volunteerId}"

          `http://localhost:5000/api/${params.volunteerId}`
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
        // "https://roadangels.onrender.com/api/update/${params.volunteerId}"

        `http://localhost:5000/api/update/${params.volunteerId}`,
        detailsObj
      );

      setIsLoading(false);
    } catch (e) {
      setErrorMes(e.message);
    }
  };
  return (
    <div className="users">
      {isLoading && <h1 className="">Spinner</h1>}
      <h1>{volunteerArr[0] && volunteerArr[0].name}</h1>
      {errorMes && <h2>{errorMes}</h2>}

      {setVolunteerArr.length && (
        <div className="users-container">
          {volunteerArr.map(
            (
              { _id, name, role, takenCalls, mail, phone, city, region },
              mapIndex
            ) => (
              <div className="user" key={_id}>
                {console.log(volunteerArr)}
                <div className="user-info">
                  <p>
                    {" "}
                    role -{" "}
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
                  </p>

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
                    mail -{" "}
                    <input
                      placeholder={mail}
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
                    city -{" "}
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
                    region -{" "}
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
                  <p>takenCalls -{takenCalls.length}</p>
                </div>
                <button onClick={handlerSubmit}>submit</button>
              </div>
            )
          )}

          <br></br>
        </div>
      )}
    </div>
  );
}

export default VolunteerPage;
