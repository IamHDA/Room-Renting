import * as request from "../utils/request.js";

export const getChatRooms = () => {
    return request.get("chatRoom/chatRooms", {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken")
        }
    });
}

export const updateChatRoomPost = (post, chatId) => {
    return request.put("chatRoom/updateChatRoomPost/" + chatId, post, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken")
        },
    })
}

export const updateLastMessageStatus = (chatRoomId) => {
    return request.put("chatRoom/updateLastMessageStatus/" + chatRoomId,{}, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken")
        }
    })
}

export const searchChatRooms = (keyword) => {
    return request.get("chatRoom/searchChatRooms", {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken")
        },
        params: {
            keyword
        }
    })
}

export const deleteChatRooms = (idList) => {
    return request.remove("chatRoom/delete?" + idList.toString(), {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken")
        }
    })
}