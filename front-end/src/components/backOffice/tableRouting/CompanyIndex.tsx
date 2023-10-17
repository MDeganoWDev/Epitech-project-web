import { Routes, Route } from 'react-router-dom'
import CompanyForm from '../tableForm/CompanyForm'
import CompanyTableDisplay from '../tableDisplay/CompanyTableDisplay'

const CompanyIndex = () => {
    return (
        <Routes>
            <Route index element={<CompanyTableDisplay />} />       
            <Route path="form" element={<CompanyForm />} />
            <Route path="form/:id" element={<CompanyForm />} />
        </Routes>
      )
}

export default CompanyIndex