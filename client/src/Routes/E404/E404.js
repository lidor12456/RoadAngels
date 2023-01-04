import React from "react";
import "./E404.css";

function E404() {
  return (
    <div>
      {" "}
      <div className="figure">
        <img
          src="https://assets.dropbox.com/www/en-us/illustrations/spot/look-magnifying-glass.svg"
          alt="Error: 4xx"
        />
      </div>
      <div id="errorbox">
        <div className="not-found">
          <h1>Error (4xx)</h1>
          <h2>The page doesn't exist or you have no permission.</h2>
          <div className="not-found--links">
            You can contact us and report this issue.
          </div>
        </div>
      </div>
    </div>
  );
}

export default E404;
