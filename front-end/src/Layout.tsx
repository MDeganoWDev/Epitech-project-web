import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";

const Layout = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const setAuthenticated = useAuthStore((state) => state.setAuthenticated);
  const clearAuthentication = useAuthStore((state) => state.clearAuthentication);


  useEffect(() => {
    const tokenExists = document.cookie.includes('token');
    if (!tokenExists) {
      clearAuthentication();
    } else {
      setAuthenticated(true);
    }
  }, [clearAuthentication, setAuthenticated]);

  return (
    <>
      <Header isAuthenticated={isAuthenticated} onDisconnect={clearAuthentication} />
      <Outlet />
      <Footer />
    </>
  )
}

export default Layout