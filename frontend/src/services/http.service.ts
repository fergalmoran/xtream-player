import axios from "axios";
export default axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-type": "application/json",
    "x-xtream-server": JSON.parse(localStorage.getItem("server") || "{}")[
      "server"
    ],
    "x-xtream-username": JSON.parse(localStorage.getItem("server") || "{}")[
      "username"
    ],
    "x-xtream-password": JSON.parse(localStorage.getItem("server") || "{}")[
      "password"
    ],
  },
});
