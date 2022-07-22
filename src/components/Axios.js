import axios from "axios";

const instance = axios.create({
  baseURL: "https://vagary-backend.herokuapp.com/",
});

export default instance;
