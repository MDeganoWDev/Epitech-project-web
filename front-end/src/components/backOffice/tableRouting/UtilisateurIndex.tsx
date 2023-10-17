import { Routes, Route } from 'react-router-dom'
import UtilisateurTableDisplay from '../tableDisplay/UtilisateurTableDisplay'
import UtilisateurForm from '../tableForm/UtilisateurForm'

const UtilisateurIndex = () => {
    return (
        <Routes>
            <Route index element={<UtilisateurTableDisplay />} />       
            <Route path="form" element={<UtilisateurForm />} />
            <Route path="form/:id" element={<UtilisateurForm />} />
        </Routes>
      )
}

export default UtilisateurIndex