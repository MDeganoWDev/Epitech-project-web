import { useNavigate } from "react-router-dom";
import { deleteContract } from "../../../api/delete/deleteContract";
import type { ContractType } from "../../../typings/type";
import { getContract } from "../../../api/get/getContract";
import { useState, useEffect } from "react";
import Pagination from "../../Pagination";

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
      <div>
          <button onClick={handleCreateNewContract}>Create new contract</button>
          <table>
              <thead>
                  <tr>
                      <th>ID</th>
                      <th>Name</th>
                  </tr>
              </thead>
              <tbody>
                  {filteredContracts.map((contract)=>(
                      <tr key={contract.id}>
                          <td>{contract.id}</td>
                          <td>{contract.name}</td>
                          <td><button onClick={() => handleEditContract(contract.id)}>Modifier</button></td>
                          <td><button onClick={() => handleDeleteContract(contract.id)}>Supprimer</button></td>
                      </tr>
                  ))}
              </tbody>
          </table>
          <Pagination count={count} next={nextPage} prev={prevPage} onPageChange={handlePageChange} />
      </div>
    )
}

export default ContractTableDisplay