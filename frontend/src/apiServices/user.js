import * as request from "../utils/request";

export const currentUser = async () => {
    return await request.get("user/currentUser", {
        headers: {
            Authorization: "Bearer " + localStorage.getItem('accessToken')
        }
    });
}

export const getUserProfile = async (userId) => {
    return await request.get("user/profile/" + userId, {});
}

export const getPersonalInformation = async () => {
    return await request.get("user/personalInformation", {
        headers: {
            Authorization: "Bearer " + localStorage.getItem('accessToken')
        }
    });
}

export const changePassword = async function (oldPassword, newPassword) {
    return await request.put("user/changePassword", {}, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem('accessToken')
        },
        params: {
            oldPassword, newPassword
        }
    })
}

export const changePersonalInformation = async (information) => {
    return await request.put("user/changeInformation", information, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem('accessToken')
        }
    })
}

export const changeAvatar = async (formData) => {
    return await request.put("user/changeAvatar", formData, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem('accessToken')
        }
    })
}

export const changeBackgroundImage = async (formData) => {
    return await request.put("user/changeBackgroundImage", formData, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem('accessToken'),
        }
    })
}