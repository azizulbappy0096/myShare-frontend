// import modules
import axios from "axios"


const instance = axios.create({
    baseURL: "https://my-share1.herokuapp.com"
})

export default instance