import React, { useEffect, useState } from "react";
import { getAdvertisement } from "../api/get/getAdvertisement";
import CardAdvertisement from "./ui/CardAdvertisement";
import type { AdvertisementType } from "../typings/type";
import Pagination from "./Pagination";
import { ScrollArea } from "./ui/scroll-area"
import { useAdvertisementStore } from "../store/advertisementStore";

const AdvertisementsPanel = () => {
  const [loading, setLoading] = useState(true);
  const [advertisements, setAdvertisements] = useState<AdvertisementType[]>([]);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const advertisementData = await getAdvertisement();
      setAdvertisements(advertisementData);
      const onlineAdvertisements = advertisementData.results.filter(advertisement => advertisement.isOnline);
      useAdvertisementStore.setState({ selectedId: onlineAdvertisements[0].id });

      setLoading(false);
      setNextPage(advertisementData.next);
      setPrevPage(advertisementData.previous);
      setCount(advertisementData.count);
    }

    fetchData()
  }, [])

  function handlePageChange(url) {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setAdvertisements(data);
        setNextPage(data.next);
        setPrevPage(data.previous);
        setCount(data.count);
      });
  }


  if (loading) {
    return <div>Loading</div>
  }
  return (
    <div className="grid grid-cols-1 gap-2">
      <ScrollArea className="h-[85vh] w-[auto] rounded-md p-2">
        <div className="grid grid-cols-1 m-2 gap-2">
          {advertisements.results.map((advertisement) => (
            <React.Fragment key={advertisement.id}>
              {advertisement.isOnline && (
                <CardAdvertisement                  
                  id={advertisement.id}
                  title={advertisement.title}
                  description={advertisement.quick_description}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </ScrollArea>
      <Pagination count={count} next={nextPage} prev={prevPage} onPageChange={handlePageChange} />
    </div>
  )
}

export default AdvertisementsPanel