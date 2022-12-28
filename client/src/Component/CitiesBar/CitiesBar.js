import React from "react";
import axios from "axios";
import { useEffect, useState, useRef, createContext } from "react";
import { Routes, Route, Link, useParams, useNavigate } from "react-router-dom";

import styles from "./CitiesBar.css";

export const myContext = createContext();

function CitiesBar() {
  const userInput = useRef();
  const navigate = useNavigate();
  const [userChoice, setUserChoice] = useState("");

  /**
   * Select a street by city in Israel
   * Cities data is from https://data.gov.il/dataset/citiesandsettelments
   * API documentation https://docs.ckan.org/en/latest/maintaining/datastore.html#ckanext.datastore.logic.action.datastore_search
   */

  // REST API URL
  const api_url = "https://data.gov.il/api/3/action/datastore_search";
  // Cities endpoint
  const cities_resource_id = "5c78e9fa-c2e2-4771-93ff-7f400a12f7ba";

  // Field names
  const city_name_key = "שם_ישוב";
  // dataset ids
  const cities_data_id = "cities-data";
  // input elements
  const cities_input = document.getElementById("city-choice");
  // let userChoice;

  useEffect(() => {
    //! edit/remove street parts
    /**
     * Get data from gov data API
     * Uses Axios just because it was easy
     */
    const getData = (
      resource_id,
      q = "",
      language = "english",
      limit = "100"
    ) => {
      console.log("sending", resource_id, q);
      return axios.get(api_url, {
        params: { resource_id, q, language, limit },
        responseType: "json",
      });
    };

    /**
     * Parse records from data into 'option' elements,
     * use data from key 'field_name' as the option value
     */
    const parseResponse = (records = [], field_name) => {
      const parsed =
        records
          .map((record) => `<option value="${record[field_name].trim()}">`)
          .join("\n") || "";
      //console.log("parsed", field_name, parsed);
      return Promise.resolve(parsed);
    };

    /**
     * Fetch data, parse, and populate Datalist
     */
    const populateDataList = (
      id,
      resource_id,
      field_name,
      query,
      language,
      limit
    ) => {
      const datalist_element = document.getElementById(id);
      console.log(datalist_element);
      if (!datalist_element) {
        console.log(
          "Datalist with id",
          id,
          "doesn't exist in the document, aborting"
        );
        return;
      }
      getData(resource_id, query, language, limit)
        .then((response) =>
          parseResponse(response?.data?.result?.records, field_name)
        )
        .then((html) => (datalist_element.innerHTML = html))
        .catch((error) => {
          console.log("Couldn't get list for", id, "query:", query, error);
        });
    };

    // ---- APP ----

    /**
     * Populate cities.
     * There are about 1300 cities in Israel, and the API upper limit is 32000
     * so we can safely populate the list only once.
     */
    populateDataList(
      cities_data_id,
      cities_resource_id,
      city_name_key,
      undefined,
      "english",
      32000
    );
  }, []);

  return (
    <myContext.Provider value={userChoice}>
      <div className="main-form">
        <form action="">
          <p> Select City </p>
          <div className="form-field" id="city-selection">
            <input
              list="cities-data"
              id="city-choice"
              name="city-choice"
              ref={userInput}
              // value={userChoice}
            />
            <br></br>
            <button
              className="btn-search"
              onClick={(e) => {
                e.preventDefault();
                // userChoice = userInput.current.value;
                setUserChoice(userInput.current.value);
                console.log(userChoice);
              }}
            >
              Search
            </button>
            <datalist id="cities-data">
              <option value="">טוען רשימת ערים...</option>
            </datalist>
          </div>

          {/* {userChoice && navigate("/result")} */}
        </form>
      </div>
    </myContext.Provider>
  );
}

export default CitiesBar;
