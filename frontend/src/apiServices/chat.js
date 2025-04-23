import * as request from '../utils/request.js';

export const updateChatRoomPost = (post, chatId) => {
    return request.put("chat/updateChatRoomPost/" + chatId, post, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
        }
    })
}

export const getChatRooms = () => {
    return request.get("chat/chatRooms", {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken")
        }
    });
}

export const getMessages = (chatId) => {
    return request.get("chat/messages/" + chatId, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken")
        }
    })
}

export const getRecipient = (recipientId) => {
    return request.get("chat/recipient/" + recipientId, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken")
        }
    })
}