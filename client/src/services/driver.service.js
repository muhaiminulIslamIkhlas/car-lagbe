import { notification } from "antd";
import axios from "axios";
import { API_BASE_URL } from "../config/settings";
import { getToken } from "../utils/user";
import { forceFullyLogout } from "./auth.services";

export async function driverRegister(values) {
    const token = getToken();
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
        }
    };
    try {
        await axios.post(API_BASE_URL + "register", values, config);
        notification.success({
            message: 'Congratulations!!!',
            description: "Request submitted successfully. Please let us verify your information"
        });
        return { hasError: false };
    } catch (error) {
        forceFullyLogout(error);
        if (error.response.status === 422) {
            const errors = error.response.data.errors;
            return { hasError: true, errors: errors };
        }
        let statusText = error.response.data.message;
        notification.error({
            message: 'Something went wrong',
            description: statusText,
        });

        return { hasError: true };

    }
}