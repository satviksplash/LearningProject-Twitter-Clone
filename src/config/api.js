import axios from "axios";

export const API_BASE_URL = "http://localhost:8080";


console.log(localStorage.getItem("jwt"));

// export const api = axios.create({
    
//     baseURL: API_BASE_URL,
//     headers: {
//         "Content-Type": "application/json",
//         "Authorization" : `Bearer ${localStorage.getItem("jwt")}`,
//     },
// })

export const getApi = () => {
    return axios.create({
        baseURL: API_BASE_URL,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("jwt")}`,
        },
    });
};

// For backward compatibility
export const api = getApi();