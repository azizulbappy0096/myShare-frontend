import React from "react";
import "./Uploader.css";

function Uploader({ show }) {
  return (
    <div className={`uploader ${!show ? "hidden" : ""}`}>
      <div className="uploader__progress" style={{ width: `${show}%` }}>
        <div className="uploader__inner">
          <p style={{ fontSize: "14px", marginBottom: "4px" }}>
            {" "}
            Uploading...{" "}
          </p>
          <p
            style={{ fontSize: "12px", marginBottom: "2px", marginTop: "2px" }}
          >
            {" "}
            {show}%{" "}
          </p>
          <div
            className="uploader__progressbar"
            style={{ width: `${show}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default Uploader;
