import { useRef, useState } from "react";

// modules
import axios from "axios";

// components
import Form from "../Form/Form";
import Uploader from "../Uploader/Uploader";

import "./Home.css";

function Home() {
  const [isDragged, setIsDragged] = useState(false);
  const [showDropZone, setShowDropZone] = useState(true);
  const [showProgress, setShowProgress] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [shareLink, setShareLink] = useState("");
  const [copied, setCopied] = useState(false);
  const baseUrl = "http://localhost:4000";
  const copyInput = useRef(null);
  const fileInput = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    setIsDragged(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
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

    // make formdata
    const data = new FormData();
    data.append("shareFile", files[0]);
    upload(data);
  };

  const handleBrowse = (e) => {
    fileInput.current.click();
  };

  const handleFileInput = (e) => {
    e.preventDefault();
    const files = fileInput.current.files;
    console.log(files);
    if (files.length > 1) {
      // toast message
      alert("Only one at a time");
      return;
    }
    // make formdata
    const data = new FormData();
    data.append("shareFile", files[0]);
    upload(data);
  };

  const handleCopy = () => {
    copyInput.current.select();
    document.execCommand("copy");
    setCopied(true);
  };

  const upload = (data) => {
    const protocol = window.location.protocol
    const host = window.location.host
    axios
      .post(`${baseUrl}/api/file/upload`, data, {
        headers: {
          "content-type": "multipart/form-data",
        },
        onUploadProgress: (e) => {
          const { loaded, total } = e;
          const percent = Math.floor((loaded / total) * 100);
          setShowProgress(percent);
        },
      })
      .then((res) => {
        if (res.status === 201) {
          const resUrl = new URL(res.data.shareFile)
          const path = resUrl.pathname
          const shareableLink = `${protocol}//${host}${path}`

          setShowDropZone(false);
          setShowProgress(false);
          setIsDragged(false);
          setShowShare(true);
          setShareLink(shareableLink);
          console.log(res);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const reset = (e) => {
    e.preventDefault()
    setShowDropZone(true);
    setShowProgress(false);
    setIsDragged(false);
    setShowShare(false);
    setShareLink("");
    setCopied(false)
  }

  return (
    <section className="home">
      <div className="home__dropContainer">
        <div
          className={`home__dropzone ${
            isDragged ? "home__draggable--bg" : ""
          } ${showDropZone ? "" : "hidden"}`}
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
            <input
              ref={fileInput}
              name="fileInput"
              type="file"
              hidden
              onChange={handleFileInput}
            />
            <h4>
              {" "}
              Drop your Files here or{" "}
              <span id="home__borowseBtn" onClick={handleBrowse}>
                {" "}
                browse{" "}
              </span>{" "}
            </h4>
          </div>
        </div>
        <Uploader show={showProgress} />
        <div className={`home__shareUrl ${!showShare ? "hidden" : ""}`}>
          <h5> Link expires in some hours </h5>
          <div className="home__shareInput">
            <input
              ref={copyInput}
              name="shareLink"
              type="text"
              value={shareLink}
              readOnly
            />
            <i
              className={`lar la-copy ${!copied ? "" : "hidden"}`}
              onClick={handleCopy}
            ></i>
            <i
              className={`las la-clipboard-check ${copied ? "" : "hidden"}`}
              onClick={handleCopy}
            ></i>
          </div>
        </div>
        <Form show={showShare} reset={reset} />
      </div>
      <div className="home__banner">
        <img src="/image/undraw-upload.svg" />
      </div>
    </section>
  );
}

export default Home;
