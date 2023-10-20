import { useNavigate } from "react-router-dom";
import { deleteUnregister } from "../../../api/delete/deleteUnregister";
import { getUnregister } from "../../../api/get/getUnregister";
import { useState, useEffect } from "react";
import Pagination from "../../Pagination";
import { Button } from "../../ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table";
import type { UnregisterType } from "../../../typings/type"
import { ArrowUpRightFromCircle, CircleOff, PlusSquare } from "lucide-react";

const UnregisterTableDisplay = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [unregisters, setUnregisters] = useState<UnregisterType[]>([]);
    const [nextPage, setNextPage] = useState(null);
    const [prevPage, setPrevPage] = useState(null);
    const [count, setCount] = useState(0);    
    const [fiteredId, setFiteredId] = useState<number[]>([]);
    const filteredUnregisters = unregisters.filter(element => !fiteredId.includes(element.id));
    
    const handleCreateNewUnregister = () => {
        navigate(`form`);        
    }
    
    const handleEditUnregister = (id? : number) => {
        navigate(`form/${id}`);
    }
    
    const handleDeleteUnregister = (id? : number) => {
        deleteUnregister(id)
        if (id) setFiteredId(prevState => [...prevState, id]);
    }
    
    useEffect(()=>{
        const fetchData = async () => {
          const unregisterData = await getUnregister();
          setUnregisters(unregisterData.results);
          setNextPage(unregisterData.next);
          setPrevPage(unregisterData.previous);
          setCount(unregisterData.count);
        setLoading(false);
        }
      
        fetchData()
      }, [])
  
      function handlePageChange(url) {
          fetch(url)
            .then(response => response.json())
            .then(data => {
                setUnregisters(data.results);
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
        <Button className="ml-2 bg-green-700" onClick={handleCreateNewUnregister}><PlusSquare className="mr-2"/> Create new Unregister</Button>
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Firstname</TableHead>
                    <TableHead>Lastname</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>CV</TableHead>
                    <TableHead>Sex</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {filteredUnregisters.map((unregister)=>(
                    <TableRow key={unregister.id}>
                        <TableCell>{unregister.id}</TableCell>
                        <TableCell>{unregister.firstname}</TableCell>
                        <TableCell>{unregister.lastname}</TableCell>
                        <TableCell>{unregister.email}</TableCell>
                        <TableCell>{unregister.phone}</TableCell>
                        <TableCell >
                        {unregister.cv ?
                         <a className="text-blue-700 hover:text-green-700" href={unregister.cv} target="_blank"> <ArrowUpRightFromCircle /></a> :
                         <div className=" text-red-700"><CircleOff /></div>
                        }
                        </TableCell>
                        <TableCell>{unregister.sex?.name}</TableCell>
                        <TableCell >
                        <Button 
                        className="bg-blue-700 mr-2" 
                        onClick={() => handleEditUnregister(unregister.id)}
                        >Update</Button>
                        <Button 
                        className="bg-red-700"
                        onClick={() => handleDeleteUnregister(unregister.id)}
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

export default UnregisterTableDisplay