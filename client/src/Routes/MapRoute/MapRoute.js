import React, { useState, useEffect, useReducer } from "react";

import {
  MapContainer,
  TileLayer,
  useMap,
  Marker,
  Popup,
  useMapEvents,
  Rectangle,
} from "react-leaflet";
import axios from "axios";
import UserService from "../../services/user.service";
import EventBus from "../../common/EventBus";
import E404 from "../E404/E404";

import "./mapRoute.css";
import geoData from "./citiesGeoDataFromApi/geoData.json";

function MapRoute() {
  const [content, setContent] = useState("");
  const [callsArr, setCallsArr] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMes, setErrorMes] = useState(null);
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
  const findCityInGeo = (str) => {
    let cityObj = geoData.find((obj) => obj.city === str);
    console.log(cityObj);
    return cityObj;
  };

  return (
    <>
      {content == "Volunteer Content." || content == "Admin Content." ? (
        <div className="leaflet-container">
          {/* {console.log(geoData)} */}
          <MapContainer
            center={{ lat: 31.7833, lng: 35.2167 }}
            zoom={8}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {callsArr &&
              callsArr.map((call) => {
                let goeData = findCityInGeo(call.city);
                const position = [goeData.lat, goeData.lng];
                console.log(position);

                return <Marker key={goeData.lat} position={position} />;
              })}
            {/* <Marker position={["31.7833", "35.2167"]}></Marker>; */}
          </MapContainer>
        </div>
      ) : (
        <E404 />
      )}
    </>
  );
}

export default MapRoute;
