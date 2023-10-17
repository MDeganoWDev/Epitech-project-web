import { Routes, Route } from 'react-router-dom'
import AdvertisementTableDisplay from '../tableDisplay/AdvertisementTableDisplay'
import AdvertisementForm from '../tableForm/AdvertisementForm'

const AdvertisementIndex = () => {
  return (
    <Routes>
        <Route index element={<AdvertisementTableDisplay />} />       
        <Route path="form" element={<AdvertisementForm />} />
        <Route path="form/:id" element={<AdvertisementForm />} />
    </Routes>
  )
}

export default AdvertisementIndex