import axios from "axios";

const instance = axios.create({
  baseURL: "https://vagary-project.herokuapp.com/",
});

export default instance;
