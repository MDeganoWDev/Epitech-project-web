import React, { useEffect, useState } from 'react'
import { AdvertisementType } from '../../../typings/type';
import { putAdvertissement } from '../../../api/put/putAdvertisement';
import { postAdvertisement } from '../../../api/post/postAdvertisement';
import { getAdvertisement } from '../../../api/get/getAdvertissement';
import { useParams, useNavigate } from 'react-router-dom';

const AdvertisementForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [idPermission, setIdPermission] = useState<number | undefined>(undefined)
  const [title, setTitle] = useState("");
  const [quickDescription, setQuickDescription] = useState("");
  const [fullDescription, setFullDescription] = useState("");
  const [hour, setHour] = useState("");
  const [wage, setWage] = useState("");
  const [isOnline, setIsOnline] = useState(false);
  const [idContract, setIdContract] = useState<number | undefined>();
  const [idCompany, setIdCompany] = useState<number | undefined>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let response
    const values : AdvertisementType = {
      title : title,
      quick_description : quickDescription,
      full_description : fullDescription,
      working_time : hour,
      wage : wage,
      isOnline : isOnline,
      contract_id : idContract,
      company_id : idCompany
    }
    
    idPermission != undefined ? response = await putAdvertissement(idPermission, values) : response = await postAdvertisement(values); 
    if (response) navigate(`/admin`);
  }
  
  const HandleCancel = () => {
    navigate(`/admin`);
  }

  const handleCheckboxChange = () => {
    setIsOnline(!isOnline);
  }

  useEffect(()=>{
    if (id != undefined){      
      const currentId = Number(id);
      setIdPermission(currentId);

      const fetchData = async () => {
          const existingAdvertisement = await getAdvertisement(currentId);
          setTitle(existingAdvertisement.title)
          setQuickDescription(existingAdvertisement.quick_description)
          setFullDescription(existingAdvertisement.full_description)
          setHour(existingAdvertisement.hour)
          setWage(existingAdvertisement.wage)
          setIsOnline(existingAdvertisement.isOnline)
          setIdContract(existingAdvertisement.contract.id);
          setIdCompany(existingAdvertisement.company.id);
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

      <label htmlFor="title">Title</label>
      <input 
        type="text" 
        name="title" 
        id="title"
        value={title}
        onChange={e => setTitle(e.target.value)}  
      />

      <label htmlFor="quick_description">Quick description</label>
      <input 
        type="text" 
        name="quick_description" 
        id="quick_description"
        value={quickDescription}
        onChange={e => setQuickDescription(e.target.value)}  
      />

      <label htmlFor="hour">Work hour</label>
      <input 
        type="text" 
        name="hour" 
        id="hour"
        value={hour}
        onChange={e => setHour(e.target.value)}  
      />

      <label htmlFor="wage">Wage</label>
      <input 
        type="text" 
        name="wage" 
        id="wage"
        value={wage}
        onChange={e => setWage(e.target.value)}  
      />

      <label htmlFor="isOnline">Is Online</label>
      <input
        type="checkbox"
        name="isOnline"
        id="isOnline"
        checked={isOnline}
        onChange={handleCheckboxChange}
      />
      
      <label htmlFor="contract">Contract ID</label>
      <input
        type="number"
        name="contract"
        id="contract"
        value={idContract}
        onChange={e => setIdContract(Number(e.target.value))} 
      />

      <label htmlFor="company">Company ID</label>
      <input
        type="number"
        name="company"
        id="company"
        value={idCompany}
        onChange={e => setIdCompany(Number(e.target.value))}  
      />

      <label htmlFor="full_description">Full Description</label>
      <textarea  
        name="full_description" 
        id="full_description"
        value={fullDescription}
        onChange={e => setFullDescription(e.target.value)}  
      />

      <button type="submit">Enregister</button>
      <button onClick={HandleCancel}>Annuler</button>
    </form>
  </div>
)
}

export default AdvertisementForm