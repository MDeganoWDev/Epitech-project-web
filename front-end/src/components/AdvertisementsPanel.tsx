import { useEffect, useState } from "react";
import { getAdvertisement } from "../api/get/getAdvertissement";
import CardAdvertisement from "./ui/CardAdvertisement";
import type { AdvertisementType } from "../typings/type";

const AdvertisementsPanel = () => {
    const [loading, setLoading] = useState(true);
    const [advertisements, setAdvertisements] = useState<AdvertisementType[]>([]);
   
  
    useEffect(()=>{
        const fetchData = async () => {
          const advertisementData = await getAdvertisement();
          setAdvertisements(advertisementData);
           setLoading(false);
        }
    
        fetchData()
      }, [])
    
      if (loading) {
        return <div>Loading</div>
      } 
  return (
    <div className="grid grid-cols-1 gap-2">
        {advertisements.map((advertisement)=>(
            <CardAdvertisement
              key = {advertisement.id}
              id = {advertisement.id}
              title = {advertisement.title}
              description = {advertisement.quick_description}
            />
        ))}
    </div>
  )
}

export default AdvertisementsPanel