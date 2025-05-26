import * as request from "../utils/request";

export const addToFavourite = async (postId) => {
    return await request.post("favouritePost/create/" + postId, "", {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken")
        }
    });
}

export const removeFromFavourite = async (postId) => {
    return await request.remove("favouritePost/delete/" + postId, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken")
        }
    })
}

export const getFavouritePostsIdByUser = async () => {
    return await request.get("favouritePost/getFavPostIdsByUser", {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken")
        }
    });
}

export const getFavouritePostByUser = async (order) => {
    return await request.get(`favouritePost/getFavPostsByUser?order=${order}`, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken")
        }
    })
}