import * as request from "../utils/request";

export const createPost = async (formData) => {
    const response = await request.post("post/create", formData, {
        headers:{
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
            'Content-Type': 'multipart/form-data'
        }
    })
    return response;
}