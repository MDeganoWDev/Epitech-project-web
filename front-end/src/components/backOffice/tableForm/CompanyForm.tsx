import React, { useEffect, useState } from 'react'
import { CompanyType } from '../../../typings/type';
import { putCompany } from '../../../api/put/putCompany';
import { postCompany } from '../../../api/post/postCompany';
import { getCompany } from '../../../api/get/getCompany';
import { useParams, useNavigate } from 'react-router-dom';
import { Label } from '../../ui/label';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';

const CompanyForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [idCompany, setIdCompany] = useState<number | undefined>(undefined)
  const [name, setName] = useState("");
  const [adress, setAdress] = useState("");
  const [idUser, setIdUser] = useState<number | undefined>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let response
    const values : CompanyType = {
      name : name,
      address : adress,
      user_id : idUser
    }
    
    idCompany != undefined ? response = await putCompany(idCompany, values) : response = await postCompany(values); 
    if (response) navigate(`/admin/company`);
  }
  
  const HandleCancel = () => {
    navigate(`/admin/company`);
  }

  useEffect(()=>{
    if (id != undefined){      
      const currentId = Number(id);
      setIdCompany(currentId);

      const fetchData = async () => {
          const existingCompany = await getCompany(currentId);
          setName(existingCompany.name)
          setAdress(existingCompany.address)
          setIdUser(existingCompany.user.id)
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
    <h1 className="text-3xl font-bold my-3">{idCompany ? `Update company ${idCompany}` : "Create new company"}</h1>
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

      <Label htmlFor="address">Adress</Label>
      <Input 
        type="text" 
        name="address" 
        id="address"
        value={adress}
        onChange={e => setAdress(e.target.value)}
        required 
        />

      <Label htmlFor="user_id">User id</Label>
      <Input 
        type="number" 
        name="user_id" 
        id="user_id"
        value={idUser}
        onChange={e => setIdUser(Number(e.target.value))}
        required 
        min={1} 
        />

      <div className="grid grid-cols-2 w-full gap-2">
        <Button className="bg-green-700" type="submit">Save</Button>
        <Button className="bg-red-700" onClick={HandleCancel}>Cancel</Button>
      </div>
    </form>
  </div>
)
}

export default CompanyForm