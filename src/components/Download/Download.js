import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import "./Download.css"

// modules
import instance from '../../utils/axios'

function Download() {
    const { uuid } = useParams()
    const [fileData, setFileData] = useState({})
    const baseUrl = "https://my-share1.herokuapp.com"
    
    useEffect(() => {
        instance.get(`/api/file/${uuid}`).then( res => {
            if(res.status === 200) {
                setFileData(res.data)
            }
        }).catch(err => {
            console.log(err.message)
        })
    }, [])

    return (
        <div className="download">
            <section className="download__container">
                <i className="las la-file-download"></i>
                <h2>Your file is ready to download</h2>
                <p> Link expires in 24 hours </p>
                <h5> {fileData.fileName} </h5>
                <small> {(fileData.fileSize/1e+6).toFixed(2)}mb </small>
                <a href={`${baseUrl}/api/file/download/${uuid}`}>
                    Donwload file
                </a>
            </section>
        </div>
    )
}

export default Download
