import { Route, Routes } from "react-router-dom"
import SelectTable from "./SelectTable"
import ShowingTable from "./ShowingTable"
import SexForm from "./tableForm/SexForm"
import PermissionForm from "./tableForm/PermissionForm"
import ContractForm from "./tableForm/ContractForm"
import CompanyForm from "./tableForm/CompanyForm"
import AdvertisementForm from "./tableForm/AdvertisementForm"
import ApplicationForm from "./tableForm/ApplicationForm"
import UtilisateurForm from "./tableForm/UtilisateurForm"
import UnregisterForm from "./tableForm/UnregisterForm"

const AdminBackOffice = () => {
  return (
    <div>
      <SelectTable/>
      <Routes>
        <Route index element={<ShowingTable />} />
        <Route path="sex-form" element={<SexForm />} />
        <Route path="sex-form/:id" element={<SexForm />} />
        <Route path="company-form" element={<CompanyForm />} />
        <Route path="company-form/:id" element={<CompanyForm />} />
        <Route path="contract-form" element={<ContractForm />} />
        <Route path="contract-form/:id" element={<ContractForm />} />
        <Route path="permission-form" element={<PermissionForm />} />
        <Route path="permission-form/:id" element={<PermissionForm />} />
        <Route path="advertissement-form" element={<AdvertisementForm />} />
        <Route path="advertissement-form/:id" element={<AdvertisementForm />} />
        <Route path="application-form" element={<ApplicationForm />} />
        <Route path="application-form/:id" element={<ApplicationForm />} />
        <Route path="utilisateur-form" element={<UtilisateurForm />} />
        <Route path="utilisateur-form/:id" element={<UtilisateurForm />} />
        <Route path="unregister-form" element={<UnregisterForm />} />
        <Route path="unregister-form/:id" element={<UnregisterForm />} />
      </Routes>
    </div>
  )
}

export default AdminBackOffice