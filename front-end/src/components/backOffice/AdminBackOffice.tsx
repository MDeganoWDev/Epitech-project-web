import { Route, Routes } from "react-router-dom"
import SelectTable from "./SelectTable"
import SexIndex from "./tableRouting/SexIndex"
import AdvertisementIndex from "./tableRouting/AdvertisementIndex"
import ApplicationIndex from "./tableRouting/ApplicationIndex"
import CompanyIndex from "./tableRouting/CompanyIndex"
import ContractIndex from "./tableRouting/ContractIndex"
import PermissionIndex from "./tableRouting/PermissionIndex"
import UnregisterIndex from "./tableRouting/UnregisterIndex"
import UtilisateurIndex from "./tableRouting/UtilisateurIndex"

const AdminBackOffice = () => {
  return (
    <div>
      <SelectTable/>
      <Routes>
        <Route index element={<UtilisateurIndex />} />
        <Route path="sex/*" element={<SexIndex/>} />
        <Route path="advertisement/*" element={<AdvertisementIndex/>} />
        <Route path="application/*" element={<ApplicationIndex/>} />
        <Route path="company/*" element={<CompanyIndex/>} />
        <Route path="contract/*" element={<ContractIndex/>} />
        <Route path="permission/*" element={<PermissionIndex/>} />
        <Route path="unregister/*" element={<UnregisterIndex/>} />
        <Route path="utilisateur/*" element={<UtilisateurIndex/>} />
      </Routes>
    </div>
  )
}

export default AdminBackOffice