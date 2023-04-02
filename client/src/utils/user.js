export const getUserInfo = () => {
    return JSON.parse(localStorage?.getItem("user"));
}

export const getToken = () => {
    return localStorage?.getItem("token");
}

export const checkLoggedIn = () => {
    const token = getToken();

    if (token) {
        return true;
    }

    return false;
}

export const getStatusByCode = (status) => {
    const allState = ["cancled", "pending", "reserved", "ongoing", "completed"];
    return allState[status];
};

export const getBadge = (status) => {
    const badges = ["badge bg-danger", "badge bg-secondary", "badge bg-primary", "badge bg-info text-dark", "badge bg-success"];
    return badges[status];
}