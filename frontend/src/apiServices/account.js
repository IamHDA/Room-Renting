import * as request from "../utils/request.js";

export const checkExistedIdentifier = async (identifier) => {
    return await request.get("account/existed", {
        params: {identifier}
    });
}

export const addNewAccountWithPhoneNumber = async (identifier, password) => {
    return await request.post("account/addWithPhoneNumber", {}, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        params: {
            identifier,
            password
        }
    })
}

export const addNewAccountWithEmail = async (email) => {
    return await request.post("account/addWithEmail/" + email, {}, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        }
    })
}