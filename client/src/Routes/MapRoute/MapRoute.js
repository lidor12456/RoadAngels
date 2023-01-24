import React, { useState, useEffect, useReducer } from "react";

import {
  MapContainer,
  TileLayer,
  useMap,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
// import "leaflet/dist/leaflet.css";
import "./mapRoute.css";
import geoData from "./citiesGeoDataFromApi/geoData.json";

function MapRoute() {
  const position = [32.08, 34.78];

  return (
    <div className="leaflet-container">
      {console.log(geoData)}
      <MapContainer
        center={{ lat: 31.7833, lng: 35.2167 }}
        zoom={8}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
      ,
    </div>
  );
}

export default MapRoute;
