import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8000/api/v1/" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("token")) {
    console.log();
    
    req.headers.Authorization = `Bearer ${localStorage.getItem("token")} `;
  }
  return req;
});
// console.log(process.env.REACT_APP_BASEURL);

export default API;
