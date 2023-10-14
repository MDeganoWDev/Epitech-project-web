import { Route, Routes } from "react-router-dom"
import SelectTable from "./SelectTable"
import ShowingTable from "./ShowingTable"
import SexForm from "./tableForm/SexForm"

const AdminBackOffice = () => {
  return (
    <div>
      <SelectTable/>
      <Routes>
        <Route index element={<ShowingTable />} />
        <Route path="sex-form" element={<SexForm />} />
        <Route path="sex-form/:id" element={<SexForm />} />
        <Route path="company-form" element={<SexForm />} />
        <Route path="company-form/:id" element={<SexForm />} />
        <Route path="contract-form" element={<SexForm />} />
        <Route path="contract-form/:id" element={<SexForm />} />
        <Route path="permission-form" element={<SexForm />} />
        <Route path="permission-form/:id" element={<SexForm />} />
        <Route path="advertissement-form" element={<SexForm />} />
        <Route path="advertissement-form/:id" element={<SexForm />} />
        <Route path="application-form" element={<SexForm />} />
        <Route path="application-form/:id" element={<SexForm />} />
        <Route path="utilisateur-form" element={<SexForm />} />
        <Route path="utilisateur-form/:id" element={<SexForm />} />
        <Route path="unregister-form" element={<SexForm />} />
        <Route path="unregister-form/:id" element={<SexForm />} />
      </Routes>
    </div>
  )
}

export default AdminBackOffice