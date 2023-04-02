import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Sidebar from "../UI/template/SIdebar";

export default function PrivateRoute({ children, role, type }) {
  const isLoggedIn = useAuth(role);
  return isLoggedIn ? type === 'dashboard' ? <Sidebar>{children}</Sidebar> : <><Header />{children}<Footer /></>: <Navigate to="/forbidden" />;
}
