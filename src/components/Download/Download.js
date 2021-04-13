import React from 'react'
import "./Download.css"

function Download() {
    return (
        <div className="download">
            <section className="download__container">
                <i class="las la-file-download"></i>
                <h2>Your file is ready to download</h2>
                <p> Link expires in 24 hours </p>
                <h5> 1618342616283-28793914.gif </h5>
                <small> 233 kb </small>
                <button>
                    Donwload file
                </button>
            </section>
        </div>
    )
}

export default Download
