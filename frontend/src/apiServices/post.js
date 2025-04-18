import * as request from "../utils/request";

export const getNewPosts = async () => {
    return await request.get("post/newPosts");
}

export const getPost = async (postId) => {
    return await request.get("post/specificPost/" + postId);
}

export const getEnablePostsByUserId = async (userId) => {
    return await request.get("post/userEnablePosts/" + userId);
}

export const getDisablePostsByUserId = async (userId) => {
    return await request.get("post/userDisablePosts/" + userId);
}

export const createPost = async (formData) => {
    return await request.post("post/create", formData, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
            'Content-Type': 'multipart/form-data'
        }
    });
}

export const changePostStatus = async (status, postId) => {
    return await request.put("post/changeStatus", {}, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
        params: {
            postId, status
        }
    })
}