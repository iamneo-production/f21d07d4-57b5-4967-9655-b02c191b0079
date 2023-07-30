import { isJwtExpired } from 'jwt-check-expiration'; //utility function used to check if a JWT is expired or not
const base_url = "https://8080-ebaadaacdbddddbdadcfbfbafdccbe.project.examly.io";
const axios = require('axios').default;

// axois object
const axiosObject = axios.create({
        baseURL: base_url,
        //timeout: 1500,
});



// Add a request interceptor. Request interceptors are functions that are executed before a request is sent, 
//allowing you to modify the request config or handle errors.
axiosObject.interceptors.request.use(function (config) {
        // set token
        var token = localStorage.getItem('jwtToken'); // The token is assumed to be stored in the browser's local storage
        
        
        if (token) {
                token = token.replace(/^"(.*)"$/, '$1'); //If a token is found, it is cleaned by removing surrounding double quotes (if any) using the token.replace(/^"(.*)"$/, '$1') regex.
                config.headers.Authorization = `Bearer ${token}`; //pass the JWT token for authentication purposes in HTTP requests.
                //code checks if the JWT is expired using the isJwtExpired(token) function imported earlier.
                if(isJwtExpired(token)){ 
                        alert('Session Expired');
                        localStorage.clear();
                        window.location.replace("/login");
                }
                // error during the request or the JWT token is not found in the local storage, an alert is shown to the user with the message "Something went wrong!".
        }else{
                alert('Something went wrong!')
                localStorage.clear();
                window.location.replace("/login");
        }
        return config;
}, function (error) {
        return Promise.reject(error);
});

export default axiosObject;