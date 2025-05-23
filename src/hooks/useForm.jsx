import {useState} from "react";
import {ZodEffects, ZodObject} from "zod";


const useForm = (form) => {
    const [ formData, setFormData ] = useState({
        ...form,
    })

    const handleChangeForm = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleValidation = (schema) => {
        schema.parse(formData);
    }

    return { formData, handleChangeForm, setFormData, handleValidation };
}


export default useForm;