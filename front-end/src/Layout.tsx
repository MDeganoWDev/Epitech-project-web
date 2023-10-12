import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Banner from "./components/Banner";
import Footer from "./components/Footer";

const Layout = () => {
  return (
    <>
    <Header isLoggedIn={true} />
    <Banner />
    <Outlet />
    <Footer/>
    </>
  )
}

export default Layout