import {callAPI} from "../../utils/helpers.js";


export const createPaymentAPI = async (data) => {
    return await callAPI({method: "post", path: "/payments", data})
}


