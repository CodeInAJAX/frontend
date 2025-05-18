import { callAPIWithMeta} from "../../utils/helpers.js";


const getCoursesAPI  = async (pageTo = 1 ,size = 20) => {
    const path = `/courses?page=${pageTo}&size=${size}`;
    return await callAPIWithMeta({method: "get", path, data: null});
}


export {
    getCoursesAPI
}