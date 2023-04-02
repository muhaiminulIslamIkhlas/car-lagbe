import axios from "axios";
import { API_BASE_URL } from "../../config/settings";
import { getToken } from "../../utils/user";
import { forceFullyLogout } from "../auth.services";

export async function getDashboardData() {
    const token = getToken();
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
        }
    };
    try {
        const url = API_BASE_URL + "admin/home";
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