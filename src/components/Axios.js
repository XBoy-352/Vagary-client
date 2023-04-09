import axios from "axios";

const instance = axios.create({
  baseURL: "https://vagary-backend.onrender.com/",
});

export default instance;
