import axiosInstance from "../../config/axios.js";
import {AxiosError} from "axios";

const uploadsProfile = async (file) => {
    // Create a FormData object to send the file
    const formData = new FormData()
    formData.append("image", file)

    try {
        // Replace with your actual API endpoint for file upload
        const axiosResponse = await axiosInstance.post("/uploads/profile", formData, {
            headers: { "Content-Type": "multipart/form-data", "Accept": "application/json" },
        })

        if (axiosResponse.status !== 200) {
            throw new Error("Failed to upload photo")
        }

        const body = axiosResponse.data;
        const data = body.data;
        return data.file_url;
    } catch (error) {
        console.error("Error uploading photo:", error);
        if (error instanceof AxiosError) {
            const errorResponse = error.response?.data;

            const errorMessages = errorResponse.errors
                .map(e => {
                    if (Array.isArray(e.details)) {
                        return e.details.join(", ");
                    }
                    return e.details; // assumed to be string
                })
                .join("\n");

            console.error(errorMessages);
            throw new Error(errorMessages);
        }

        throw new Error("Failed to upload photo. Please try again.")
    }
}


export {
    uploadsProfile,
}