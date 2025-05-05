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

export const getPosts = async (params) => {
    return await request.get("admin/postTable", {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken")
        },
        params: params
    })
}

export const getUsers = async (params) => {
    return await request.get("admin/userTable", {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken")
        },
        params: params
    })
}

export const getPostReport = async (postId) => {
    return await request.get("admin/post/" + postId, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken")
        }
    })
}

export const getUserReport = async (userId) => {
    return await request.get("admin/user/" + userId, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken")
        }
    })
}

export const deleteReport = async (reportId) => {
    return await request.remove("admin/report/delete/" + reportId, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken")
        }
    })
}

export const deleteUser = async (userId) => {
    return await request.remove("admin/user/delete/" + userId, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken")
        }
    })
}