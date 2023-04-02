import Footer from "../Footer/Footer";
import Header from "../Header/Header";

export default function PublicRoute({ children }) {
  return <><Header />{children}<Footer /></>;
}
