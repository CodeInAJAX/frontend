import {useState} from "react";


const useSubmitting = () => {
    const [ isSubmitting, setIsSubmitting ] = useState(false);
    return {isSubmitting, setIsSubmitting};
}

export default useSubmitting;