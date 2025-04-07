import * as request from "../utils/request";

export const currentUser = async () => {
    const response = await request.get("user/currentUser", {
        headers:{
            Authorization: "Bearer " + localStorage.getItem('accessToken')
        }
    });
    return response;
}