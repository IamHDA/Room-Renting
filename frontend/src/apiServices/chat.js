import * as request from '../utils/request.js';

export const getRecipient = (recipientId) => {
    return request.get("chat/recipient/" + recipientId, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken")
        }
    })
}