import * as request from "../utils/request.js";

export const getUserRating = async (reviewerId, reviewedId) => {
    return await request.get("userRating/userRate/", {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken")
        },
        params: {
            reviewerId, reviewedId
        }
    });
}

export const rateUser = async (reviewerId, reviewedId, rate) => {
    return await request.post("userRating/postRate", {}, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken")
        },
        params: {
            reviewerId, reviewedId, rate
        }
    });
}

export const changeRate = async (reviewerId, reviewedId, rate) => {
    return await request.put("userRating/putRate", {}, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken")
        },
        params: {
            reviewedId, reviewerId, rate
        }
    });
}
