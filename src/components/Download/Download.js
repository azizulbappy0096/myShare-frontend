import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import "./Download.css";

// modules
import instance from "../../utils/axios";

function Download() {
  const { uuid } = useParams();
  const [fileData, setFileData] = useState({});
  const [expiresIn, setExpiresIn] = useState("24:00:00");
  const baseUrl = "https://my-share1.herokuapp.com";

  useEffect(() => {
    instance
      .get(`/api/file/${uuid}`)
      .then((res) => {
        if (res.status === 200) {
          setFileData(res.data);

          counter(res.data.createdAt);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  function counter(createdAt) {
    let counterTime = new Date(createdAt).getTime() + 1000 * 60 * 60 * 24;

    setInterval(() => {
      let currentTime = new Date().getTime();
      let gapTime = counterTime - currentTime;

      let inHour = Math.floor(
        (gapTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      let inMin = Math.floor((gapTime % (1000 * 60 * 60)) / (1000 * 60));
      let inSec = Math.floor((gapTime % (1000 * 60)) / 1000);

      setExpiresIn(`${inHour}:${inMin}:${inSec}`);
    }, 1000);
  }

  return (
    <div className="download">
      <section className="download__container">
        <i className="las la-file-download"></i>
        <h2>Your file is ready to download</h2>
        <p> Link expires in {expiresIn} </p>
        <h5> {fileData.fileName} </h5>
        <small> {(fileData.fileSize / 1e6).toFixed(2)}mb </small>
        <a href={`${baseUrl}/api/file/download/${uuid}`}>Donwload file</a>
      </section>
    </div>
  );
}

export default Download;
