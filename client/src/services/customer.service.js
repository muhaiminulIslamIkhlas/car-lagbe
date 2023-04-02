import { notification } from "antd";
import axios from "axios";
import { API_BASE_URL } from "../config/settings";
import { getToken, getUserInfo } from "../utils/user";
import { forceFullyLogout } from "./auth.services";

export async function journeyRequest(values) {
    const token = getToken();


    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
        }
    };
    try {
        console.log(token);
        if (!token) {
            notification.error({
                message: 'Please login first',
                description: "Please login for journey request",
            });
            return { hasError: true };
        }

        const userInfo = getUserInfo();
        console.log(userInfo.id);
        const id = userInfo.id;
        await axios.post(API_BASE_URL + "journey-request", { user_id: id, ...values }, config);

        notification.success({
            message: 'Congratulations!!!',
            description: "Request submitted successfully."
        });

        return { hasError: false };
    } catch (error) {
        console.log(error);
        forceFullyLogout(error);
        notification.error({
            message: 'Ooops!!!',
            description: "Something went wrong",
        });

        return { hasError: true };

    }
}

export async function getAllRides() {
    const token = getToken();


    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
        }
    };
    try {
        if (!token) {
            notification.error({
                message: 'Please login first',
                description: "Please login for journey request",
            });
            return { hasError: true };
        }

        const response = await axios.get(API_BASE_URL + "all-rides", config);

        return { hasError: false, data: response.data.result };
    } catch (error) {
        forceFullyLogout(error);
        notification.error({
            message: 'Please login first',
            description: "Please login for journey request",
        });

        return { hasError: true };

    }
}

