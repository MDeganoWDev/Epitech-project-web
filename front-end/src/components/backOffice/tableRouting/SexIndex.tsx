import { Route, Routes } from 'react-router-dom'
import SexForm from '../tableForm/SexForm'
import SexTableDisplay from '../tableDisplay/SexTableDisplay'

const SexIndex = () => {
  return ( 
    <Routes>
        <Route index element={<SexTableDisplay />} />       
        <Route path="form" element={<SexForm />} />
        <Route path="form/:id" element={<SexForm />} />
    </Routes>
  )
}

export default SexIndex