import { Routes, Route } from 'react-router-dom'
import ContractTableDisplay from '../tableDisplay/ContractTableDisplay'
import ContractForm from '../tableForm/ContractForm'

const ContractIndex = () => {
    return (
        <Routes>
            <Route index element={<ContractTableDisplay />} />       
            <Route path="form" element={<ContractForm />} />
            <Route path="form/:id" element={<ContractForm />} />
        </Routes>
      )
}

export default ContractIndex