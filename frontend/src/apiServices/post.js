import * as request from "../utils/request";

export const createPost = async (formData) => {
    return await request.post("post/create", formData, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
            'Content-Type': 'multipart/form-data'
        }
    });
}

export const getNewPosts = async () => {
    return await request.get("post/newPosts");
}

export const getPost = async (postId) => {
    return await request.get("post/specificPost/" + postId);
}

export const addToFavourite = async (postId) => {
    return await request.post("post/addToFavourite/" + postId);
}