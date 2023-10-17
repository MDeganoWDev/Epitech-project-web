import { Routes, Route } from 'react-router-dom'
import PermissionTableDisplay from '../tableDisplay/PermissionTableDisplay'
import PermissionForm from '../tableForm/PermissionForm'

const PermissionIndex = () => {
    return (
        <Routes>
            <Route index element={<PermissionTableDisplay />} />       
            <Route path="form" element={<PermissionForm />} />
            <Route path="form/:id" element={<PermissionForm />} />
        </Routes>
      )
}

export default PermissionIndex