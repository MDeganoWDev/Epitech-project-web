import { useEffect, useState } from "react";
import { getAdvertisement } from "../api/get/getAdvertisement";
import { AdvertisementType } from "../typings/type";
import { useAdvertisementStore } from "../store/advertisementStore";
import { useNavigate } from "react-router-dom";
import { ScrollArea } from "./ui/scroll-area";

const SelectedAdvertisement = () => {
  const navigate = useNavigate();
  const selectedId = useAdvertisementStore((state) => state.selectedId);
  const [loading, setLoading] = useState(true);
  const [advertisement, setAdvertisement] =
    useState<AdvertisementType>();

  useEffect(() => {
    setLoading(true);
    if (selectedId != undefined) {
      const fetchData = async () => {
        const advertisementData = await getAdvertisement(selectedId);
        setAdvertisement(advertisementData);
        setLoading(false);
      };
      fetchData();
    }
  }, [selectedId]);

  if (loading) {
    return <div>Loading</div>;
  }

  return (
    <ScrollArea className="h-[85vh] w-[auto] bg-secondary text-black rounded-md p-2">
      <div className="mb-2 text-muted-foreground">
        Created at {advertisement?.offer_date}
        <br /><br />
      </div>
      <div className="mb-2 font-bold text-xl">{advertisement?.title}</div>
      <div className="mb-2 text-lg underline">{advertisement?.company?.name}<br/><br/></div>
      <div className="mb-2">Contract type: {advertisement?.contract?.name}</div>
      <div className="mb-2">Work time: {advertisement?.working_time}</div>
      <div className="mb-2">{advertisement?.company?.address}</div>
      <div className="mb-2 font-bold">{advertisement?.wage}<br /><br /></div>
      <div className="mb-2">{advertisement?.full_description}</div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => navigate(`/apply/${advertisement?.id}`)}
      >
        Apply
      </button>
    </ScrollArea>
  );
};

export default SelectedAdvertisement;
