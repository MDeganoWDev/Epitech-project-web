import { useNavigate } from "react-router-dom";
import { deleteContract } from "../../../api/delete/deleteContract";
import type { ContractType } from "../../../typings/type";

type ContractTableDisplayProps = {
  contracts : ContractType[]
}

const ContractTableDisplay = ({contracts} : ContractTableDisplayProps) => {
  const navigate = useNavigate();

  const handleCreateNewContract = () => {
      navigate(`contract-form`);        
  }
  
  const handleEditContract = (id? : number) => {
      navigate(`contract-form/${id}`);
  }

  const handleDeleteContract = (id? : number) => {
      deleteContract(id)
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