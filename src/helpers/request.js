import axios from "axios";

const user = JSON.parse(localStorage.getItem("user"));

const request = axios.create({
    baseURL: "http://localhost:4000",
    headers: { Authorization: `Bearer ${user && user.token}` },
});

export default request;
