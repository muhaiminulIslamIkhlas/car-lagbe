import { notification } from "antd";
import axios from "axios";
import { API_BASE_URL } from "../config/settings";
import { getToken } from "../utils/user";
import { forceFullyLogout } from "./auth.services";

export async function getRideById(id) {
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

        const response = await axios.get(API_BASE_URL + "ride-by-id/" + id, config);

        return { hasError: false, data: response.data.result[0] };
    } catch (error) {
        forceFullyLogout(error);
        notification.error({
            message: 'Please login first',
            description: "Please login for journey request",
        });

        return { hasError: true };

    }
}

export async function getBidByJourney(id) {
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

        const response = await axios.get(API_BASE_URL + "all-bids/" + id, config);

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

export async function getAllRequest(pageNumber, driverId) {
    const token = getToken();
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
        }
    };
    try {
        const url = API_BASE_URL + "all-request?page=" + pageNumber + "&driverId=" + driverId;
        const response = await axios.get(url, config);
        return response.data;
    } catch (error) {
        forceFullyLogout(error);
        if (error.response.status === 422) {
            const errors = error.response.data.errors;
            return { hasError: true, errors: errors };
        }
    }
}

export async function addBid(value) {
    const token = getToken();
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
        }
    };

    try {
        const url = API_BASE_URL + "bid-add";
        await axios.post(url, value, config);
        return true;
    } catch (error) {
        forceFullyLogout(error);
        if (error.response.status === 422) {
            const errors = error.response.data.errors;
            return { hasError: true, errors: errors };
        }
    }
} 