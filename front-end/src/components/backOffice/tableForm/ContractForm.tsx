import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { ContractType } from '../../../typings/type';
import { putContract } from '../../../api/put/putContract';
import { postContract } from '../../../api/post/postContract';
import { getContract } from '../../../api/get/getContract';
import { Label } from '../../ui/label';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';

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
  <div className=" mx-4">
    <h1 className="text-3xl font-bold my-3">{idContract ? `Update contract ${idContract}` : "Create new contract"}</h1>
    <form className=" max-w-md gap-3 flex flex-col" onSubmit={handleSubmit}>
      <Label htmlFor="name">Name</Label>
      <Input 
        type="text" 
        name="name" 
        id="name"
        value={name}
        onChange={e => setName(e.target.value)}
        required 
      />
      <div className="grid grid-cols-2 w-full gap-2">
        <Button className="bg-green-700" type="submit">Save</Button>
        <Button className="bg-red-700" onClick={HandleCancel}>Cancel</Button>
      </div>
    </form>
  </div>
)
}

export default ContractForm