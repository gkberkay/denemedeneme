import axios from 'axios';

const HTTP = axios.create({
    baseURL: "http://localhost:3434",
    withCredentials:true

})
export default HTTP;