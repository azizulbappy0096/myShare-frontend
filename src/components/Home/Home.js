import { useState } from "react";

// modules
import axios from "axios";

// components
import Form from "../Form/Form";
import Uploader from "../Uploader/Uploader";

import "./Home.css";

function Home() {
  const [isDragged, setIsDragged] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [fileInput, setFileInput] = useState("");
  const [shareLink, setShareLink] = useState("");

  const handleDrag = (e) => {
    e.preventDefault();
    console.log(e);
    setIsDragged(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    console.log(e);
    setIsDragged(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    console.log(files);
    if (files.length > 1) {
      // toast message
      alert("Only one at a time");
      return;
    }
    setFileInput(files[0]);
  };

  return (
    <section className="home">
      <div className="home__dropContainer">
        <div
          className={`home__dropzone ${isDragged ? "home__draggable--bg" : ""}`}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onDragLeave={handleDragLeave}
        >
          <div
            className={`home__dropIcon ${isDragged ? "home__draggable" : ""}`}
          >
            <img
              src="/image/file.svg"
              alt="file-upload icon"
              className="dropIcon__left"
              draggable="false"
            />
            <img
              src="/image/file.svg"
              alt="file-upload icon"
              className="dropIcon__center"
              draggable="false"
            />
            <img
              src="/image/file.svg"
              alt="file-upload icon"
              className="dropIcon__right"
              draggable="false"
            />
          </div>
          <div className="home__dropInput">
            <input name="fileInput" value={fileInput} type="hidden" />
            <h4>
              {" "}
              Drop your Files here or{" "}
              <span id="home__borowseBtn"> browse </span>{" "}
            </h4>
          </div>
        </div>
        <Uploader show={showProgress} />
        <div className={`home__shareUrl ${!showShare ? "hidden" : ""}`}>
          <h5> Link expires in some hours </h5>
          <div className="home__shareInput">
            <input name="shareLink" type="text" value={shareLink} readOnly />
            <i class="lar la-copy"></i>
          </div>
        </div>
        <Form show={showShare} />
      </div>
      <div className="home__banner">
        <img src="/image/undraw-upload.svg" />
      </div>
    </section>
  );
}

export default Home;
