import { isJwtExpired } from 'jwt-check-expiration';
const base_url = "https://8080-fabacaabcebdadcfbfbafdccbe.project.examly.io";
const axios = require('axios').default;

// axois object
const axiosObject = axios.create({
        baseURL: base_url,
        //timeout: 1500,
});



// Add a request interceptor
axiosObject.interceptors.request.use(function (config) {
        // set token
        var token = localStorage.getItem('jwtToken');
        
        
        if (token) {
                token = token.replace(/^"(.*)"$/, '$1');
                config.headers.Authorization = `Bearer ${token}`;
                if(isJwtExpired(token)){
                        alert('Session Expired');
                        localStorage.clear();
                        window.location.replace("/login");
                }
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