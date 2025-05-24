import {useState} from "react";


const useStatusMessage = () => {
    const [statusMessage, setStatusMessage] = useState({ type: "", message: "" });

    return { statusMessage, setStatusMessage };
}

export default useStatusMessage;