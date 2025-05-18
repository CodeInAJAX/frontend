import {AxiosError} from "axios";
import axiosInstance from "../../config/axios.js";

const register = async (user) => {
    try {
        const axiosResponse = await axiosInstance.post("/users", user);
        const body = axiosResponse.data;
        return body.data
    } catch (error) {
        if ( error instanceof AxiosError ) {
            const errorResponse = error.response.data;
            throw new Error(errorResponse.errors.map(err => err.details).join(","));
        }
        throw error;
    }
}


export {
    register
};