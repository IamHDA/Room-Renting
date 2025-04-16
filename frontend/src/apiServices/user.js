import * as request from "../utils/request";

export const currentUser = async () => {
    return await request.get("user/currentUser", {
        headers: {
            Authorization: "Bearer " + localStorage.getItem('accessToken')
        }
    });
}