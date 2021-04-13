import React from "react";
import "./Uploader.css"

function Uploader({show}) {
  return (
    <div className={`uploader ${!show ? "hidden" : ""}`}>
      <div className="uploader__progress">
          <p style={{fontSize: "14px", marginBottom: "4px"}}> Uploading... </p>
          <p style={{fontSize: "12px", marginBottom: "2px", marginTop: "2px"}}> 20% </p>
          <div className="uploader__progressbar">

          </div>
      </div>
    </div>
  );
}

export default Uploader;
