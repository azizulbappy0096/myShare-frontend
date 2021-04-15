import React, { useEffect, useState } from "react";
import "./ToastMessage.css";

function ToastMessage({ error, success, text, count }) {
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    if (text) {
      setIsShow(true);
    }

    return () => {
      setTimeout(() => {
        setIsShow(false);
      }, 3000);
    };
  }, [count]);

  return (
    <div
      className={`toast ${!isShow ? "toast--hidden" : ""} ${
        error ? "error" : ""
      } ${success ? "success" : ""}`}
    >
      <p> {text} </p>
    </div>
  );
}

export default ToastMessage;
