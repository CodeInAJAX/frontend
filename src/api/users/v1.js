import {callAPI} from "../../utils/helpers.js";

const registerAPI = async (user) => {
    return await callAPI({method: "post", path: "/users", data: user});
}

const loginAPI = async (user) => {
    return await callAPI({method: "post", path: "/users/login", data: user});
};

const profileAPI = async () => {
  return await callAPI({method: "get", path: "/users/detail"});
};

const updateAPI = async (user) => {
    return await callAPI({method: "put", path: "/users", data: user});
}

const logoutAPI = async () => {
    return await callAPI({method: "delete", path: "/users/logout"});
}


export {
    registerAPI,
    loginAPI,
    profileAPI,
    updateAPI,
    logoutAPI,
};