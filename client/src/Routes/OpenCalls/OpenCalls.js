import React, { useState, useEffect, useReducer } from "react";
import { Routes, Route, Link, useParams } from "react-router-dom";
import axios from "axios";
import styles from "./OpenCalls.css";

function OpenCalls() {
  const [callsArr, setCallsArr] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMes, setErrorMes] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          "https://roadangels.onrender.com/api/allcalls"
        );
        console.log(data);
        setCallsArr(data);
        setIsLoading(false);
      } catch (e) {
        setErrorMes(e.message);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="open-calls">
      <h1>Open Calls</h1>
      {errorMes && <h2>{errorMes}</h2>}

      {isLoading && <h1 className="">Spinner</h1>}
      {setCallsArr.length && (
        <div className="calls-container">
          {callsArr.map(
            (
              { _id, name, openingTime, subject, mail, phone, city, region },
              mapIndex
            ) => (
              <div className="call" key={_id}>
                {console.log(callsArr)}
                <div className="call-info">
                  <p>{/* <Link to={`/store/${_id}`}>Name - {name}</Link> */}</p>
                  <p> openingTime - {openingTime}</p>
                  <p> subject - {subject}</p>
                  <p> Name - {name}</p>
                  <p> mail - {mail}</p>
                  <p> phone - {phone}</p>
                  <p> city - {city}</p>
                  <p> region - {region}</p>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}

export default OpenCalls;
