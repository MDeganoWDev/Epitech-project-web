import React, { useEffect, useState } from 'react'
import { CompanyType } from '../../../typings/type';
import { putCompany } from '../../../api/put/putCompany';
import { postCompany } from '../../../api/post/postCompany';
import { getCompany } from '../../../api/get/getCompany';
import { useParams, useNavigate } from 'react-router-dom';

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
  <div>
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input 
        type="text" 
        name="name" 
        id="name"
        value={name}
        onChange={e => setName(e.target.value)} 
        required
        />

      <label htmlFor="address">Adress</label>
      <input 
        type="text" 
        name="address" 
        id="address"
        value={adress}
        onChange={e => setAdress(e.target.value)}
        required 
        />

      <label htmlFor="user_id">User id</label>
      <input 
        type="number" 
        name="user_id" 
        id="user_id"
        value={idUser}
        onChange={e => setIdUser(Number(e.target.value))}
        required 
        min={1} 
        />

      <button type="submit">Enregister</button>
      <button onClick={HandleCancel}>Annuler</button>
    </form>
  </div>
)
}

export default CompanyForm