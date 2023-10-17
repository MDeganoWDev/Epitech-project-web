import { useNavigate } from "react-router-dom";
import { deleteContract } from "../../../api/delete/deleteContract";
import type { ContractType } from "../../../typings/type";
import { getContract } from "../../../api/get/getContract";
import { useState, useEffect } from "react";

const ContractTableDisplay = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [contracts, setContracts] = useState<ContractType[]>([]);
  const handleCreateNewContract = () => {
      navigate(`form`);        
    }
  
  const handleEditContract = (id? : number) => {
      navigate(`form/${id}`);
    }

    const handleDeleteContract = (id? : number) => {
      deleteContract(id)
    }

    useEffect(()=>{
      const fetchData = async () => {
        const contractData = await getContract();
        setContracts(contractData);
      setLoading(false);
      }
    
      fetchData()
    }, [])
    
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
                  {contracts.map((contract)=>(
                      <tr key={contract.id}>
                          <td>{contract.id}</td>
                          <td>{contract.name}</td>
                          <td><button onClick={() => handleEditContract(contract.id)}>Modifier</button></td>
                          <td><button onClick={() => handleDeleteContract(contract.id)}>Supprimer</button></td>
                      </tr>
                  ))}
              </tbody>
          </table>
      </div>
    )
}

export default ContractTableDisplay