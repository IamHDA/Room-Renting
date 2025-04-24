import axios from 'axios';
import * as authService from '../apiServices/authentication.js'

const request = axios.create({
    baseURL: 'http://localhost:8080/',
    timeout: 5000
})

let isRefreshing = false;
let failedRequestsQueue = [];

const refreshToken = async () => {
    try {
        const response = await authService.refreshToken();
        const newAccessToken = response.accessToken;
        localStorage.setItem('accessToken', newAccessToken);
        return newAccessToken;
    } catch (e) {
        console.error("Error refreshing token:", e);
        return null;
    }
};

request.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response.data === "AccessToken expired!") {
            if (isRefreshing) {
                return new Promise(resolve => {
                    failedRequestsQueue.push(newToken => {
                        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
                        resolve(axios(originalRequest));
                    });
                });
            }
            isRefreshing = true;
            const newAccessToken = await refreshToken();
            isRefreshing = false;
            if (newAccessToken) {
                originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
                const res = await request(originalRequest);
                failedRequestsQueue.forEach(callback => callback(newAccessToken));
                failedRequestsQueue = [];
                return res;
            }
        }
        return Promise.reject(error);
    }
);

export const get = async (api, config = {}) => {
    const response = await request.get(api, config);
    return response.data;
}

export const post = async (api, options = {}, config = {}) => {
    const response = await request.post(api, options, config);
    return response.data;
}

export const put = async (api, options = {}, config = {}) => {
    const response = await request.put(api, options, config);
    return response.data;
}

export const remove = async (api, config = {}) => {
    const response = await request.delete(api, config);
    return response.data;
}