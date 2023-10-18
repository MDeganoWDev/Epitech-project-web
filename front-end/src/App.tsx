import MainContent from "./components/MainContent";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminBackOffice from "./components/backOffice/AdminBackOffice";
import ApplicationPage from "./components/ApplicationPage";
import RegisterPage from "./components/RegisterPage";
import UserOffice from "./components/UserOffice";
import Layout from "./Layout";

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainContent />} />
          <Route path="admin/*" element={<AdminBackOffice />} />
          <Route path="user/" element={<RegisterPage />} />
          <Route path="user/profile/" element={<UserOffice />} />
          <Route path="apply/:id" element={<ApplicationPage />} />
        </Route>
      </Routes>
    </BrowserRouter>

    </>
  )
}

export default App
