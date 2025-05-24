import {callAPI, callAPIWithMeta} from "../../utils/helpers.js";


const getCoursesAPI  = async (pageTo = 1 ,size = 20) => {
    const path = `/courses?page=${pageTo}&size=${size}`;
    return await callAPIWithMeta({method: "get", path, data: null});
}

const getCourseAPI = async (courseId) => {
    return await callAPI({method: "get", path: `/courses/${courseId}`});
}

const createCourseAPI = async (course) => {
    return await callAPI({method: "post", path: `/courses`, data: course})
}

const deleteCourseAPI = async (course) => {
    return await callAPI({method: "delete", path: `/courses/${course.id}`})
}

const updateCourseAPI = async (courseId, course) => {
    return await callAPI({method: "patch", path: `/courses/${courseId}`, data: course})
}


export {
    getCoursesAPI,
    createCourseAPI,
    deleteCourseAPI,
    updateCourseAPI,
    getCourseAPI,
}