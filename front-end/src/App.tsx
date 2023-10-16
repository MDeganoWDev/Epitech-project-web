import MainContent from "./components/MainContent";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminBackOffice from "./components/backOffice/AdminBackOffice";

import RegisterPage from "./components/RegisterPage";
import Layout from "./Layout";

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainContent />} />
          <Route path="admin/*" element={<AdminBackOffice />} />
          <Route path="user/*" element={<RegisterPage />} />
        </Route>
      </Routes>
    </BrowserRouter>

    </>
  )
}

export default App
