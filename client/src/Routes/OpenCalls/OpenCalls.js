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
import UserService from "../../services/user.service";
import EventBus from "../../common/EventBus";
import E404 from "../E404/E404";
import "./OpenCalls.css";

function OpenCalls() {
  const [content, setContent] = useState("");
  const [callsArr, setCallsArr] = useState([]);
  const [manipulateCallsArr, setManipulateCallsArr] = useState([]);
  const [citiesNamesState, setCitiesNamesState] = useState("");
  const [cityChoose, setCityChoose] = useState("");
  const [regionsState, setRegionsState] = useState([
    "יהודה ושומרון",
    "דרום",
    "ירושלים",
    "מרכז",
    "תל אביב",
    "חיפה",
    "צפון",
  ]);
  const [regionChoose, setRegionChoose] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMes, setErrorMes] = useState(null);
  const navigate = useNavigate();

  const changeStrToCapitalize = (str) => {
    const arr = str.split(" ");

    for (let i = 0; i < arr.length; i++) {
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }

    str = arr.join(" ");
    return str;
  };

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
        setManipulateCallsArr(data);
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
    const govData = async () => {
      const { data } = await axios.get(
        "https://data.gov.il/api/3/action/datastore_search?resource_id=d4901968-dad3-4845-a9b0-a57d027f11ab",
        {
          params: { q: "", language: "english", limit: 3200 },
          responseType: "json",
        }
      );

      let citiesNamesArr = data.result.records.map((city) =>
        city.שם_ישוב_לועזי.toLowerCase().trim()
      );
      let capitalizeNames = [];
      for (let i = 0; i < citiesNamesArr.length; i++) {
        citiesNamesArr[i] = changeStrToCapitalize(citiesNamesArr[i]);
        capitalizeNames.push(citiesNamesArr[i]);
      }
      console.log(capitalizeNames);
      setCitiesNamesState(citiesNamesArr.sort());
    };
    govData();
  }, []);

  const handlerDelete = async (id) => {
    try {
      setIsLoading(true);
      const { data } = await axios.put(
        `https://roadangels.onrender.com/api/updatecall/${id}`,

        // `http://localhost:5000/api/updatecall/${id}`,
        { isDeleted: true }
      );

      setIsLoading(false);
      setManipulateCallsArr((prev) => {
        return prev.filter(({ _id }) => _id !== id);
      });
    } catch (e) {
      setErrorMes(e.message);
      console.log(e.message);
    }
  };

  const handlerFilter = (filterMethod, value) => {
    setManipulateCallsArr(callsArr);
    value.trim();
    console.log(value);
    console.log(filterMethod);
    setManipulateCallsArr((prev) => {
      return prev.filter((obj) => obj[filterMethod] === value);
    });
  };

  return (
    <>
      <div className="filter-bar">
        <p className="">
          City
          <select
            onChange={({ target: { value } }) => {
              setCityChoose(value);
            }}
          >
            <option value="Select City"> Select City </option>

            {citiesNamesState &&
              citiesNamesState.map((city) => (
                <option value={city}>{city}</option>
              ))}
          </select>
          <button
            className="btn btn-primary"
            onClick={() => {
              handlerFilter("city", cityChoose.trim());
            }}
          >
            Filter By City
          </button>
        </p>
        <p className="">
          Region
          <select
            onChange={({ target: { value } }) => {
              setRegionChoose(value);
            }}
          >
            <option value="Select Region"> Select Region </option>

            {regionsState &&
              regionsState.map((region) => (
                <option value={region}>{region}</option>
              ))}
          </select>
          <button
            className="btn btn-primary"
            onClick={() => {
              handlerFilter("region", regionChoose);
            }}
          >
            Filter By Region
          </button>
        </p>
      </div>

      <div className="oc card-group main-container">
        {console.log(content)}
        {isLoading && <h1 className="spinner">Spinner</h1>}

        {content == "Volunteer Content." || content == "Admin Content." ? (
          <div>
            <h1>
              Open Calls
              <button
                className="btn btn-primary"
                style={{ marginLeft: "2%" }}
                onClick={() => {
                  navigate("/map");
                }}
              >
                Show Calls On Map
              </button>
            </h1>

            {errorMes && <h2>{errorMes}</h2>}
            {setManipulateCallsArr.length && (
              <div className="card-group">
                {manipulateCallsArr.map(
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
                    <div className="card-group mb-10">
                      {console.log(callsArr)}
                      <div className="oc card mb-10" key={_id}>
                        <p> Subject - {subject}</p>
                        <p> Name - {name}</p>
                        <p> Mail - {mail}</p>
                        <p> Phone - {phone}</p>
                        <p> City - {city}</p>
                        <p> Region - {region}</p>
                        {/* <p> Deleted? - {isDeleted}</p> */}
                        <small className="text-muted mb-3">
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
    </>
  );
}

export default OpenCalls;
