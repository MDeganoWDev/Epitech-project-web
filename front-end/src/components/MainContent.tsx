import AdvertisementsPanel from "./AdvertisementsPanel"
import SelectedAdvertisement from "./SelectedAdvertisement"

const MainContent = () => {
  return (
   <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
    <AdvertisementsPanel/>
    <SelectedAdvertisement/>
  </div>
  )
}

export default MainContent