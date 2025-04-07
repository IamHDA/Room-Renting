import * as request from '../utils/request.js'

export const login = async (identifier, password) => {
    const response = await request.post('authenticate/login',{identifier, password});
    return response;
}

export const register = async (identifier, password, fullName) => {
    const response = await request.post('authenticate/register',{identifier, password, fullName});
    return response;
}

export const refreshToken = async () => {
    const response = await request.post('authenticate/refresh-token', {}, {
        headers:{
            Authorization: "Bearer " + localStorage.getItem("refreshToken"),
        }
    });
    return response;
}

export const logout = async () => {
    const response = await request.post('logout',{}, {
        headers:{
            Authorization: "Bearer " + localStorage.getItem('accessToken'),
        }
    })
    return response;
}