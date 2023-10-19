import MainContent from "./components/MainContent";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import withAdminPermission from "./components/backOffice/AdminBackOffice";
import AdminBackOffice from "./components/backOffice/AdminBackOffice"
import ApplicationPage from "./components/ApplicationPage";
import RegisterPage from "./components/RegisterPage";
import UserOffice from "./components/UserOffice";
import Layout from "./Layout";
import { AdvertisementPage } from "./components/AdvertisementPage";

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainContent />} />
          {/* <Route path="admin/*" element={withAdminPermission(AdminBackOffice)} /> */}
          <Route path="admin/*" element={<AdminBackOffice/>} />
          <Route path="user/" element={<RegisterPage />} />
          <Route path="user/profile/" element={<UserOffice />} />
          <Route path="advertisement/create/:company" element={<AdvertisementPage />} />
          <Route path="apply/:id" element={<ApplicationPage />} />
        </Route>
      </Routes>
    </BrowserRouter>

    </>
  )
}

export default App
