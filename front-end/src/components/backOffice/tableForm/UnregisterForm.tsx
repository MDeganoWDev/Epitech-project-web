import React, { useEffect, useState } from 'react'
import { putUnregister } from '../../../api/put/putUnregister';
import { postUnregister } from '../../../api/post/postUnregister';
import { getUnregister } from '../../../api/get/getUnregister';
import { useParams, useNavigate } from 'react-router-dom';
import type { UnregisterType } from '../../../typings/type';

const UnregisterForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [idUnregister, setIdUnregister] = useState<number | undefined>(undefined)
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [cv, setCv] = useState("");
  const [idSex, setIdSex] = useState<number | undefined>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let response
    const values : UnregisterType = {
      firstname : firstname,
      lastname : lastname,
      phone : phone,
      email : email,
      cv : cv,
      sex_id : idSex
    }
    
    idUnregister != undefined ? response = await putUnregister(idUnregister, values) : response = await postUnregister(values); 
    if (response) navigate(`/admin`);
  }
  
  const HandleCancel = () => {
    navigate(`/admin`);
  }

  useEffect(()=>{
    if (id != undefined){      
      const currentId = Number(id);
      setIdUnregister(currentId);

      const fetchData = async () => {
          const existingUnregister = await getUnregister(currentId);
          setFirstname(existingUnregister.firstname)
          setLastname(existingUnregister.lastname)
          setPhone(existingUnregister.phone)
          setEmail(existingUnregister.email)
          setCv(existingUnregister.cv)
          setIdSex(existingUnregister.sex.id)
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
      <label htmlFor="firstname">Firstname</label>
      <input 
        type="text" 
        name="firstname" 
        id="firstname"
        value={firstname}
        onChange={e => setFirstname(e.target.value)}  
      />

      <label htmlFor="lastname">Lastname</label>
      <input 
        type="text" 
        name="lastname" 
        id="lastname"
        value={lastname}
        onChange={e => setLastname(e.target.value)}  
      />

      <label htmlFor="phone">Phone</label>
      <input 
        type="phone" 
        name="phone" 
        id="phone"
        value={phone}
        onChange={e => setPhone(e.target.value)}  
      />
      
      <label htmlFor="email">Email</label>
      <input 
        type="email" 
        name="email" 
        id="email"
        value={email}
        onChange={e => setEmail(e.target.value)}  
      />

      <label htmlFor="cv">CV (PDF)</label>
      <input
        type="file"
        accept=".pdf"
        name="cv"
        id="cv"
        // onChange={handleFileChange}
      />

      <label htmlFor="sex_id">Sex id</label>
      <input 
        type="number" 
        name="sex_id" 
        id="sex_id"
        value={idSex}
        onChange={e => setIdSex(Number(e.target.value))}  
        />

      <button type="submit">Enregister</button>
      <button onClick={HandleCancel}>Annuler</button>
    </form>
  </div>
)
}

export default UnregisterForm