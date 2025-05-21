import axiosInstance from "../../config/axios.js";
import {AxiosError} from "axios";
import {axiosErrorResponseToMessage} from "../../utils/helpers.js";

const uploadsProfileAPI = async (file) => {
    // Create a FormData object to send the file
    const formData = new FormData()
    formData.append("image", file)

    try {
        // Replace with your actual API endpoint for file upload
        const axiosResponse = await axiosInstance.post("/uploads/profile", formData, {
            headers: { "Content-Type": "multipart/form-data", "Accept": "application/json" },
        })

        const body = axiosResponse.data;
        const data = body.data;
        return data;
    } catch (error) {
        console.error("Error uploading photo:", error);
        if (error instanceof AxiosError) {
            throw new Error(axiosErrorResponseToMessage(error));
        }

        throw new Error("Failed to upload photo. Please try again.")
    }
}


export {
    uploadsProfileAPI,
}