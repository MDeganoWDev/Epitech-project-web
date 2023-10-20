import { useNavigate } from 'react-router-dom'
import { deleteSex } from '../../../api/delete/deleteSex'
import { useEffect, useState } from 'react'
import { getSex } from '../../../api/get/getSex'
import Pagination from '../../Pagination'
import { Button } from '../../ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table'
import type { SexType } from '../../../typings/type'
import { PlusSquare } from 'lucide-react'

const SexTableDisplay = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [sex, setSex] = useState<SexType[]>([]);
    const [nextPage, setNextPage] = useState(null);
    const [prevPage, setPrevPage] = useState(null);
    const [count, setCount] = useState(0);    
    const [fiteredId, setFiteredId] = useState<number[]>([]);
    const filteredSex = sex.filter(element => !fiteredId.includes(element.id));
       
    const handleCreateNewSex = () => {
        navigate(`form`);        
    }
    
    const handleEditSex = (id? : number) => {
        navigate(`form/${id}`);
    }

    const handleDeleteSex = (id? : number) => {
        deleteSex(id)
        if (id) setFiteredId(prevState => [...prevState, id]);
    }

    useEffect(()=>{
        const fetchData = async () => {
          const sexData = await getSex();
          setSex(sexData.results);
          setNextPage(sexData.next);
          setPrevPage(sexData.previous);
          setCount(sexData.count);
        setLoading(false);
        }
      
        fetchData()
      }, [])
  
      function handlePageChange(url) {
          fetch(url)
            .then(response => response.json())
            .then(data => {
                setSex(data.results);
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
            <Button className="ml-2 bg-green-700" onClick={handleCreateNewSex}><PlusSquare className="mr-2"/> Create new Gender</Button>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Name</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredSex.map((element)=>(
                        <TableRow key={element.id}>
                            <TableCell>{element.id}</TableCell>
                            <TableCell>{element.name}</TableCell>
                            <TableCell >
                                <Button 
                                className="bg-blue-700 mr-2" 
                                onClick={() => handleEditSex(element.id)}
                                >Update</Button>
                                <Button 
                                className="bg-red-700"
                                onClick={() => handleDeleteSex(element.id)}
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

export default SexTableDisplay