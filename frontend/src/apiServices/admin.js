import * as request from "../utils/request.js";

export const getTotalPosts = async () => {
    return await request.get("admin/totalPosts", {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken")
        }
    })
}

export const getTotalUsers = async () => {
    return await request.get("admin/totalUsers", {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken")
        }
    })
}

export const getTotalReports = async () => {
    return await request.get("admin/totalReports", {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken")
        }
    })
}