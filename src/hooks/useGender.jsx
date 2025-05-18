import { useState } from "react";

const useGender = () => {
    const [gender, setGender] = useState("");

    const handleGenderChange = (selectedGender) => {
        setGender(selectedGender === gender ? "" : selectedGender);
    };

    return { gender, handleGenderChange };
};

export default useGender;
