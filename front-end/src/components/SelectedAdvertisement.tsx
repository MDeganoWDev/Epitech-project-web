import { useEffect, useState } from "react";
import { getAdvertisement } from "../api/get/getAdvertisement";
import { AdvertisementType } from "../typings/type";
import { useAdvertisementStore } from "../store/advertisementStore";

const SelectedAdvertisement = () => {
    const selectedId = useAdvertisementStore((state)=> state.selectedId)
    const [loading, setLoading] = useState(true);
    const [advertisement, setAdvertisement] = useState<AdvertisementType>();
    
    useEffect(()=>{
      setLoading(true); 
      if (selectedId != undefined){      
        const fetchData = async () => {
            const advertisementData = await getAdvertisement(selectedId);
            setAdvertisement(advertisementData);
            setLoading(false);
        }        
        fetchData()
      }
    }, [selectedId])

    if (loading) {
      return <div>Loading</div>
    }

  return (
    <div className="bg-white text-black rounded-2xl p-2">
        <div>{advertisement?.offerDate}</div>
        <div>{advertisement?.title}</div>
        <div>{advertisement?.wage}</div>
        <div>{advertisement?.contract?.name}</div>
        <div>{advertisement?.working_time}</div>
        <div>{advertisement?.full_description}</div>
        <div>{advertisement?.company?.name}</div>
        <div>{advertisement?.company?.address}</div>
    </div>
  )
}

export default SelectedAdvertisement