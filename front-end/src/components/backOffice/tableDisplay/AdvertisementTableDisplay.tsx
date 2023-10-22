import { useNavigate } from "react-router-dom";
import { deleteAdvertisement } from "../../../api/delete/deleteAdvertisement";
import { useEffect, useState } from "react";
import { getAdvertisement } from "../../../api/get/getAdvertisement";
import Pagination from "../../Pagination";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table";
import { Button } from "../../ui/button";
import { PlusSquare } from "lucide-react";
import type{ AdvertisementType } from "../../../typings/type";

const AdvertisementTableDisplay = () => {
    const navigate = useNavigate();    
    const [loading, setLoading] = useState(true);
    const [advertisements, setAdvertisements] = useState<AdvertisementType[]>([]);
    const [nextPage, setNextPage] = useState(null);
    const [prevPage, setPrevPage] = useState(null);
    const [count, setCount] = useState(0);    
    const [fiteredId, setFiteredId] = useState<number[]>([]);
    const filteredAdvertisement = advertisements.filter(element => !fiteredId.includes(element.id));
    
    const handleCreateNewAdvertissement = () => {
        navigate(`form`);        
    }
    
    const handleEditAdvertissement = (id? : number) => {
        navigate(`form/${id}`);
    }

    const handleDeleteAdvertissement = (id? : number) => {
        deleteAdvertisement(id)
        if (id) setFiteredId(prevState => [...prevState, id]);
    }

    const formattedDate = (dataDate : string) => {
        const date = new Date(dataDate);
        const options = {
          day: "numeric",
          month: "long",
          year: "numeric",
          hour: "numeric",
          minute: "numeric",
        };
        return date.toLocaleString("en-En", options);
    }
    
    useEffect(()=>{
        const fetchData = async () => {
          const advertissementData = await getAdvertisement();
          setAdvertisements(advertissementData.results);
          setNextPage(advertissementData.next);
          setPrevPage(advertissementData.previous);
          setCount(advertissementData.count);
        setLoading(false);
        }
      
        fetchData()
      }, [])
    
      function handlePageChange(url) {
          fetch(url)
            .then(response => response.json())
            .then(data => {
                setAdvertisements(data.results);
              setNextPage(data.next);
              setPrevPage(data.previous);
              setCount(data.count);
            });
        }
    
    if (loading) {
        return <div>Loading</div>
    }
    
    return (
        <div className="pt-2">
           <Button className="ml-2 bg-green-700" onClick={handleCreateNewAdvertissement}><PlusSquare className="mr-2"/> Create new advertissement</Button>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Wage</TableHead>
                        <TableHead>Working time</TableHead>
                        <TableHead>Quick description</TableHead>
                        <TableHead>Full description</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Contract</TableHead>
                        <TableHead>Company ID</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredAdvertisement.map((advertisement)=>(
                        <TableRow key={advertisement.id}>
                            <TableCell>{advertisement.id}</TableCell>
                            <TableCell>{formattedDate(advertisement.offer_date)}</TableCell>
                            <TableCell>{advertisement.title}</TableCell>
                            <TableCell>{advertisement.wage}</TableCell>
                            <TableCell>{advertisement.working_time}</TableCell>
                            <TableCell>{advertisement.quick_description}</TableCell>
                            <TableCell>{advertisement.full_description}</TableCell>
                            <TableCell>
                                {advertisement.isOnline ? 
                                <div className="bg-green-700 text-white rounded-3xl text-center p-1">Online</div> : 
                                <div className="bg-red-700 text-white rounded-3xl text-center p-1">Offline</div>}
                            </TableCell>
                            <TableCell>{advertisement.contract?.name}</TableCell>
                            <TableCell>{advertisement.company?.id}</TableCell>
                            <TableCell >
                                <Button 
                                className="bg-blue-700 mr-2" 
                                onClick={() => handleEditAdvertissement(advertisement.id)}
                                >Update</Button>
                                <Button 
                                className="bg-red-700"
                                onClick={() => handleDeleteAdvertissement(advertisement.id)}
                                >Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Pagination count={count} next={nextPage} prev={prevPage} onPageChange={handlePageChange} />
        </div>
      )
}

export default AdvertisementTableDisplay