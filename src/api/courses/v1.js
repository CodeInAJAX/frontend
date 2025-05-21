import {callAPI, callAPIWithMeta} from "../../utils/helpers.js";


const getCoursesAPI  = async (pageTo = 1 ,size = 20) => {
    const path = `/courses?page=${pageTo}&size=${size}`;
    return await callAPIWithMeta({method: "get", path, data: null});
}

const createCourseAPI = async (course) => {
    return await callAPI({method: "post", path: `/courses`, data: course})
}

const deleteCourseAPI = async (course) => {
    return await callAPI({method: "delete", path: `/courses/${course.id}`})
}


export {
    getCoursesAPI,
    createCourseAPI,
    deleteCourseAPI
}