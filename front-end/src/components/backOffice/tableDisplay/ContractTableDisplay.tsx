import { useNavigate } from "react-router-dom";
import { deleteContract } from "../../../api/delete/deleteContract";
import type { ContractType } from "../../../typings/type";
import { getContract } from "../../../api/get/getContract";
import { useState, useEffect } from "react";
import Pagination from "../../Pagination";
import { Button } from "../../ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table";
import { PlusSquare } from "lucide-react";

const ContractTableDisplay = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [contracts, setContracts] = useState<ContractType[]>([]);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [count, setCount] = useState(0);    
  const [fiteredId, setFiteredId] = useState<number[]>([]);
  const filteredContracts = contracts.filter(element => !fiteredId.includes(element.id));

  const handleCreateNewContract = () => {
    navigate(`form`);        
  }
  
  const handleEditContract = (id? : number) => {
    navigate(`form/${id}`);
  }
  
  const handleDeleteContract = (id? : number) => {
    deleteContract(id)
    if (id) setFiteredId(prevState => [...prevState, id]);
    }

    useEffect(()=>{
      const fetchData = async () => {
        const permissionData = await getContract();
        setContracts(permissionData.results);
        setNextPage(permissionData.next);
        setPrevPage(permissionData.previous);
        setCount(permissionData.count);
      setLoading(false);
      }
    
      fetchData()
    }, [])

    function handlePageChange(url) {
        fetch(url)
          .then(response => response.json())
          .then(data => {
            setContracts(data.results);
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
          <Button className="ml-2 bg-green-700" onClick={handleCreateNewContract}><PlusSquare className="mr-2"/> Create new Contract</Button>
          <Table>
              <TableHeader>
                  <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Name</TableHead>
                  </TableRow>
              </TableHeader>
              <TableBody>
                  {filteredContracts.map((contract)=>(
                      <TableRow key={contract.id}>
                          <TableCell>{contract.id}</TableCell>
                          <TableCell>{contract.name}</TableCell>
                          <TableCell >
                            <Button 
                            className="bg-blue-700 mr-2" 
                            onClick={() => handleEditContract(contract.id)}
                            >Update</Button>
                            <Button 
                            className="bg-red-700"
                            onClick={() => handleDeleteContract(contract.id)}
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

export default ContractTableDisplay