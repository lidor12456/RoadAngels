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
          // `http://localhost:5000/api/notdeletedcalls`
          "https://roadangels.onrender.com/api/notdeletedcalls"
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
        "https://roadangels.onrender.com/api/updatecall/${id}",

        // `http://localhost:5000/api/updatecall/${id}`,
        { isDeleted: true }
      );

      setIsLoading(false);
    } catch (e) {
      setErrorMes(e.message);
    }
  };

  return (
    <div className="oc card-group main-container">
      {console.log(content)}
      {content == "Volunteer Content." || content == "Admin Content." ? (
        <div>
          <h1>Open Calls</h1>
          {errorMes && <h2>{errorMes}</h2>}

          {isLoading && <h1 className="">Spinner</h1>}
          {setCallsArr.length && (
            <div className="card-group">
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
                    test,
                  },
                  mapIndex
                ) => (
                  <div className="card-group mb-10">
                    {console.log(callsArr)}
                    <div className="oc card mb-10" key={_id}>
                      <p> subject - {subject}</p>
                      <p> test - {test}</p>
                      <p> Name - {name}</p>
                      <p> mail - {mail}</p>
                      <p> phone - {phone}</p>
                      <p> city - {city}</p>
                      <p> region - {region}</p>
                      <p> region - {isDeleted}</p>
                      <small class="text-muted mb-3">
                        <p>Opening Time - {openingTime}</p>
                      </small>
                      <Link to={`/opencalls/${_id}`}>
                        <button className="oc btn btn-primary btn-block mb-4">
                          Edit
                        </button>
                      </Link>
                      <button
                        className=" btn btn-danger btn-block mb-4"
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
                        Delete
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
