import * as request from "../utils/request.js";

export const getCurrentAccount = () => {
    return request.get("account/currentAccount", {});
}