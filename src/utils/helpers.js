import axiosInstance from "../config/axios.js";
import {AxiosError} from "axios";

export const axiosErrorResponseToMessage = (error) => {
    const errorResponse = error.response.data;
    return errorResponse.errors.map(err => {
        if (Array.isArray(err.details)) {
            return err.details.join(",")
        }
        return err.details
    }).join(",");
}

export const callAPI = async ({ method, path, data }) => {
    try {
        const axiosResponse = await axiosInstance({
            method,
            url: path,
            data,
        });

        return axiosResponse.data?.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(axiosErrorResponseToMessage(error));
        }
        throw error;
    }
};