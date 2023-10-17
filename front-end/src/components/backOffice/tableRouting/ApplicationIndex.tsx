import { Routes, Route } from 'react-router-dom'
import ApplicationTableDisplay from '../tableDisplay/ApplicationTableDisplay'
import ApplicationForm from '../tableForm/ApplicationForm'

const ApplicationIndex = () => {
    return (
        <Routes>
            <Route index element={<ApplicationTableDisplay />} />       
            <Route path="form" element={<ApplicationForm />} />
            <Route path="form/:id" element={<ApplicationForm />} />
        </Routes>
      )
}

export default ApplicationIndex