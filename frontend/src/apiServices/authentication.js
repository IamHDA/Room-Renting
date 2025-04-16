import * as request from '../utils/request.js'

export const login = async (identifier, password) => {
    return await request.post('authenticate/login', {identifier, password});
}

export const register = async (identifier, password, fullName) => {
    return await request.post('authenticate/register', {identifier, password, fullName});
}

export const refreshToken = async () => {
    return await request.post('authenticate/refresh-token', {}, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("refreshToken"),
        }
    });
}

export const logout = async () => {
    const response = await request.post('logout',{}, {
        headers:{
            Authorization: "Bearer " + localStorage.getItem('accessToken'),
        }
    })
    return response;
}