import * as request from "../utils/request.js";

export const getMessages = (chatId) => {
    return request.get("message/messages/" + chatId, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken")
        }
    })
}

export const getLastMessageIdByChatId = (chatId) => {
    return request.get("message/getLastMessageId/" + chatId, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken")
        }
    })
}

export const uploadMessageMedia = (chatId, formData) => {
    return request.post("message/uploadMessageMedia" , formData, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken")
        }
    })
}

export const revokeMessage = (messageId, chatId) => {
    return request.put("message/revoke",{}, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken")
        },
        params: {
            messageId, chatId
        }
    });
}