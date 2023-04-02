import { getToken, getUserInfo } from "../utils/user";

export default function useAuth(role) {

    const auth = { accessToken: getToken(), user: getUserInfo() };
    if (auth?.accessToken && role.includes(auth.user?.role)) {
        return true;
    } else {
        return false;
    }
}