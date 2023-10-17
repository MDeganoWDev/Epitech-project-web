import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { ContractType } from '../../../typings/type';
import { putContract } from '../../../api/put/putContract';
import { postContract } from '../../../api/post/postContract';
import { getContract } from '../../../api/get/getContract';

const ContractForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [idContract, setIdContract] = useState<number | undefined>(undefined)
  const [name, setName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let response
    const values : ContractType = {
      name : name
    }
    
    idContract != undefined ? response = await putContract(idContract, values) : response = await postContract(values); 
    if (response) navigate(`/admin/contract`);
  }
  
  const HandleCancel = () => {
    navigate(`/admin/contract`);
  }

  useEffect(()=>{
    if (id != undefined){      
      const currentId = Number(id);
      setIdContract(currentId);

      const fetchData = async () => {
          const existingContract = await getContract(currentId);
          setName(existingContract.name)
          setLoading(false);
      }      

      fetchData()
    } else {
      setLoading(false)
    }
  }, [id])

  if (loading) {
    return <div>Loading</div>
  }

return (
  <div>
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input 
        type="text" 
        name="name" 
        id="name"
        value={name}
        onChange={e => setName(e.target.value)}  
        />
      <button type="submit">Enregister</button>
      <button onClick={HandleCancel}>Annuler</button>
    </form>
  </div>
)
}

export default ContractForm