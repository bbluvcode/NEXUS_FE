import { toast } from "react-toastify";
import ToastMessage from "./ToastMessage";

const showToast = (messages, type = "success", duration = 3000) => {
    let content;

    if (Array.isArray(messages)) {
        content = <ToastMessage messages={messages} />;
    } else {
        content = messages;
    }

    toast[type](content, {
        position: "top-right",
        autoClose: duration,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
};


export default showToast;