import React, { useEffect, useState } from "react";
import "./Form.css";

import ToastMessage from "../ToastMessage/ToastMessage";
import instance from "../../utils/axios";

function Form({ show, reset, uuid }) {
  const [emailFrom, setEmailFrom] = useState("");
  const [emailTo, setEmailTo] = useState("");
  const [toast, setToast] = useState({
    text: "",
    success: false,
    error: false,
    count: 0,
  });

  const handleMail = (e) => {
    e.preventDefault();

    instance
      .post(`/api/send`, {
        uuid,
        emailFrom,
        emailTo,
      })
      .then((res) => {
        if (res.status === 200) {
          setToast((prev) => ({
            text: res.data.success,
            success: true,
            error: false,
            count: prev.count + 1,
          }));
        } else {
          console.log(res);
        }
      })
      .catch((err) => {
        setToast((prev) => ({
          text: "Something went wrong!",
          error: true,
          success: false,
          count: prev.count + 1,
        }));
      });
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    console.log(name);
    if (name === "emailFrom") {
      setEmailFrom(value);
    } else {
      setEmailTo(value);
    }
  };

  return (
    <div className={`form ${!show ? "hidden" : ""}`}>
      <h5> Or send via E-mail </h5>
      <div className="form__container">
        <form onSubmit={handleMail}>
          <div className="form__field">
            <label htmlFor="emailFrom"> From </label>
            <input
              name="emailFrom"
              id="emailFrom"
              type="email"
              value={emailFrom}
              onChange={handleInput}
              required
            />
          </div>
          <div className="form__field">
            <label htmlFor="emailTo"> To </label>
            <input
              name="emailTo"
              id="emailTo"
              type="email"
              value={emailTo}
              onChange={handleInput}
              required
            />
          </div>
          <button type="submit" style={{ marginRight: "8px" }}>
            Send
          </button>
          <button type="button" onClick={reset}>
            Share another file
          </button>
        </form>
      </div>
      <ToastMessage
        error={toast.error}
        success={toast.success}
        text={toast.text}
        count={toast.count}
      />
    </div>
  );
}

export default Form;
