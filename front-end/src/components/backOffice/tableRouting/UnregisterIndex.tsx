import { Routes, Route } from 'react-router-dom'
import UnregisterTableDisplay from '../tableDisplay/UnregisterTableDisplay'
import UnregisterForm from '../tableForm/UnregisterForm'

const UnregisterIndex = () => {
    return (
        <Routes>
            <Route index element={<UnregisterTableDisplay />} />       
            <Route path="form" element={<UnregisterForm />} />
            <Route path="form/:id" element={<UnregisterForm />} />
        </Routes>
      )
}

export default UnregisterIndex