import {useState} from "react";
import z from "zod";


const useErrors = () => {
    const [errors, setErrors] = useState({});

    const handleWhenInputForm = (e) => {
        const { name } = e.target;
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: "",
            }))
        }
    }

    const handleZodErrors = (err) => {
        if (!(err instanceof z.ZodError)) {
            throw err;
        }
        const formattedErrors = {}
        err.errors.forEach((err) => {
            formattedErrors[err.path[0]] = err.message
        })
        setErrors(formattedErrors)
    }

    return { errors, setErrors, handleWhenInputForm, handleZodErrors };

}

export default useErrors;