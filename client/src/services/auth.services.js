import axios from 'axios';
import { API_BASE_URL } from '../config/settings';
import { notification } from 'antd';
import { getToken } from '../utils/user';
const tokenKey = "token";
const userKey = 'user';

export function forceFullyLogout(error) {
    if (error.response.status === 401) {
        localStorage.removeItem(tokenKey);
        localStorage.removeItem(userKey);
        notification.error({
            message: 'Session experied',
            description: "Please login again",
        });
        setTimeout(function () {
            window.location.reload(true);
        }, 1000)
    }
}

export async function login(phone, password) {
    try {
        const { data } = await axios.post(API_BASE_URL + "login", {
            phone,
            password,
        });
        localStorage.setItem(tokenKey, data.result.token);
        localStorage.setItem(userKey, JSON.stringify(data.result.user));
        notification.success({
            message: 'Logged in successfully',
            description: data.message,
        });

        return true;

    } catch (error) {
        let statusText = error.response.data.message;
        notification.error({
            message: 'Something went wrong',
            description: statusText,
        });
    }
}

export async function logout() {
    const token = getToken();
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    try {
        await axios.post(API_BASE_URL + "logout", {}, config);
        localStorage.removeItem(tokenKey);
        localStorage.removeItem(userKey);
        notification.success({
            message: 'Logged out!!!',
            description: "Logged out successfully"
        });
        window.location.reload(true);
        return true;
    } catch (error) {
        forceFullyLogout(error);
        let statusText = error.response.data.message;
        notification.error({
            message: 'Something went wrong',
            description: statusText,
        });
    }
}

export async function adminLogout() {
    const token = getToken();
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    try {
        await axios.post(API_BASE_URL + "logout", {}, config);
        localStorage.removeItem(tokenKey);
        localStorage.removeItem(userKey);
        notification.success({
            message: 'Logged out!!!',
            description: "Logged out successfully"
        });
        window.location.reload(true);
    } catch (error) {
        forceFullyLogout(error);
        let statusText = error.response.data.message;
        notification.error({
            message: 'Something went wrong',
            description: statusText,
        });
    }
}

export async function customerRegister(values) {
    const token = getToken();
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    try {
        await axios.post(API_BASE_URL + "auth/customer-register", values, config);
        notification.success({
            message: 'Welcome!!!',
            description: "Registered successfully"
        });
        return { hasError: false };
    } catch (error) {
        forceFullyLogout(error);
        console.log(error)
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