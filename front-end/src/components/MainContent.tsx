import AdvertisementsPanel from "./AdvertisementsPanel"
import SelectedAdvertisement from "./SelectedAdvertisement"
import { useAuthStore } from "../store/authStore";

const MainContent = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
   <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
    <AdvertisementsPanel/>
    <SelectedAdvertisement/>
    {isAuthenticated ? <p>You are connected</p> : <p>You are not connected</p>}
  </div>
  )
}

export default MainContent