import React, { useState, useEffect, useReducer } from "react";
import {
  Routes,
  Route,
  Link,
  useParams,
  Navigate,
  useNavigate,
} from "react-router-dom";
import axios from "axios";
import "./OpenCalls.css";
import UserService from "../../services/user.service";
import EventBus from "../../common/EventBus";

function OpenCalls() {
  const [content, setContent] = useState("");
  const [callsArr, setCallsArr] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMes, setErrorMes] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `http://localhost:5000/api/notdeletedcalls`
          // "https://roadangels.onrender.com/api/allcalls"
        );
        console.log(data);
        setCallsArr(data);
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

  const handlerDelete = async (id) => {
    try {
      setIsLoading(true);
      const { data } = await axios.put(
        // "https://roadangels.onrender.com/api/updatecall/${id}"

        `http://localhost:5000/api/updatecall/${id}`,
        { isDeleted: true }
      );

      setIsLoading(false);
    } catch (e) {
      setErrorMes(e.message);
    }
  };

  return (
    <div className="open-calls">
      {console.log(content)}
      {content == "Volunteer Content." || content == "Admin Content." ? (
        <div>
          <h1>Open Calls</h1>
          {errorMes && <h2>{errorMes}</h2>}

          {isLoading && <h1 className="">Spinner</h1>}
          {setCallsArr.length && (
            <div className="calls-container">
              {callsArr.map(
                (
                  {
                    _id,
                    name,
                    openingTime,
                    subject,
                    mail,
                    phone,
                    city,
                    region,
                    isDeleted,
                  },
                  mapIndex
                ) => (
                  <div className="call" key={_id}>
                    {console.log(callsArr)}
                    <div className="call-info">
                      <p>
                        {/* <Link to={`/store/${_id}`}>Name - {name}</Link> */}
                      </p>
                      <p> openingTime - {openingTime}</p>
                      <p> subject - {subject}</p>
                      <p> Name - {name}</p>
                      <p> mail - {mail}</p>
                      <p> phone - {phone}</p>
                      <p> city - {city}</p>
                      <p> region - {region}</p>
                      <p> region - {isDeleted}</p>
                      <Link to={`/opencalls/${_id}`}>
                        <button className="btn">edit</button>
                      </Link>
                      <button
                        className="btn"
                        onClick={() => {
                          {
                            errorMes && <h2>{errorMes}</h2>;
                          }

                          {
                            isLoading && <h1 className="">Spinner</h1>;
                          }
                          handlerDelete(_id);
                          window.location.reload(false);
                        }}
                      >
                        delete
                      </button>
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

export default OpenCalls;
