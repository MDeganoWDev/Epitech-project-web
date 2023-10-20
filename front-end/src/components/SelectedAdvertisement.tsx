import { useEffect, useState } from "react";
import { getAdvertisement } from "../api/get/getAdvertisement";
import { AdvertisementType } from "../typings/type";
import { useAdvertisementStore } from "../store/advertisementStore";
import { useNavigate } from "react-router-dom";
import { ScrollArea } from "./ui/scroll-area"

const SelectedAdvertisement = () => {
    const navigate = useNavigate();
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
    <ScrollArea className="h-[85vh] w-[auto] bg-secondary text-black rounded-md p-2">
        <div>{advertisement?.offer_date}</div>
        <div>{advertisement?.title}</div>
        <div>{advertisement?.wage}</div>
        <div>{advertisement?.contract?.name}</div>
        <div>{advertisement?.working_time}</div>
        <div>{advertisement?.full_description}</div>
        <div>{advertisement?.company?.name}</div>
        <div>{advertisement?.company?.address}</div>
        <br/>
        <button onClick={function () {navigate(`/apply/${advertisement?.id}`)}}>Apply</button>
    </ScrollArea>
  )
}

export default SelectedAdvertisement