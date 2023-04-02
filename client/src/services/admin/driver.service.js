import { notification } from "antd";
import axios from "axios";
import { API_BASE_URL } from "../../config/settings";
import { getToken } from "../../utils/user";
import { forceFullyLogout } from "../auth.services";

export async function getAllDriver(pageNumber, search) {
    const token = getToken();
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
        }
    };
    try {
        const url = API_BASE_URL + "get-all-driver?page=" + pageNumber + "&query=" + search;
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

export async function getAllPendingRequest(pageNumber, search) {
    const token = getToken();
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
        }
    };
    try {
        const url = API_BASE_URL + "driver-register-request" + "?page=" + pageNumber + "&query=" + search;
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

export async function getDriverById(id) {
    const token = getToken();
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
        }
    };

    try {
        const url = API_BASE_URL + "driver-details/" + id;
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

export async function activateOrDeactivate(id) {
    const token = getToken();
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
        }
    };

    try {
        const url = API_BASE_URL + "driver-activate-deactivate/" + id;
        await axios.get(url, config);
        return true;
    } catch (error) {
        forceFullyLogout(error);
        return false;
    }

}