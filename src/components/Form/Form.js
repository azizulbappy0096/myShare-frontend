import React from 'react'
import "./Form.css"

function Form({ show }) {
    return (
        <div className={`form ${!show ? "hidden" : ""}`}>
            <h5> Or send via E-mail </h5>
            <div className="form__container">
                <form>
                    <div className="form__field">
                        <label for="sender"> From </label>
                        <input id="sender" type="email" />
                    </div>
                    <div className="form__field">
                        <label for="reciever"> To </label>
                        <input id="reciever" type="email" />
                    </div>
                    <button type="submit" style={{marginRight: "8px"}}>
                        Send
                    </button>
                    <button type="button">
                        Share another file
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Form
