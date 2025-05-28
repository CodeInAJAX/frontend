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
        const axiosResponse = data ? await axiosInstance({
            method,
            url: path,
            data,
        }) : await axiosInstance({
            method,
            url: path,
        });

        return axiosResponse.data?.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(axiosErrorResponseToMessage(error));
        }
        throw error;
    }
};

export const callAPIWithMeta = async ({ method, path, data }) => {
    try {
        const axiosResponse = data ? await axiosInstance({
            method,
            url: path,
            data,
        }) : await axiosInstance({
            method,
            url: path,
        });

        return { data: axiosResponse.data?.data, meta: axiosResponse?.data.meta };
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(axiosErrorResponseToMessage(error));
        }
        throw error;
    }
};

