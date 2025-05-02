import * as request from "../utils/request.js";

export const reportPost = async (postId, report) => {
    return await request.post("report/reportPost/" + postId, report, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken")
        }
    })
}

export const reportUser = async (userId, report) => {
    return await request.post("report/reportUser/" + userId, report, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken")
        }
    })
}