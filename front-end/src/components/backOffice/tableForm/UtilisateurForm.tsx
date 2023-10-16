import React, { useEffect, useState } from 'react'
import { putUtilisateur } from '../../../api/put/putUtilisateur';
import { postUtilisateur } from '../../../api/post/postUtilisateur';
import { UtilisateurType } from '../../../typings/type';
import { getUtilisateur } from '../../../api/get/getUtilisateur';
import { useParams, useNavigate } from 'react-router-dom';

const UtilisateurForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [idUnregister, setIdUnregister] = useState<number | undefined>(undefined)
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [cv, setCv] = useState("");
  const [password, setPassword] = useState("");
  const [idPermission, setIdPermission] = useState<number | undefined>();
  const [idSex, setIdSex] = useState<number | undefined>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let response
    const values : UtilisateurType = {
      firstname : firstname,
      lastname : lastname,
      phone : phone,
      email : email,
      cv : cv,
      password : password,
      permission_id : idPermission,
      sex_id : idSex
    }
    
    idUnregister != undefined ? response = await putUtilisateur(idUnregister, values) : response = await postUtilisateur(values); 
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
          const existingUnregister = await getUtilisateur(currentId);
          setFirstname(existingUnregister.firstname)
          setLastname(existingUnregister.lastname)
          setPhone(existingUnregister.phone)
          setEmail(existingUnregister.email)
          setCv(existingUnregister.cv)
          setIdPermission(existingUnregister.permission.id)
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

      <label htmlFor="permission_id">Permission id</label>
      <input 
        type="number" 
        name="permission_id" 
        id="permission_id"
        value={idPermission}
        onChange={e => setIdPermission(Number(e.target.value))}  
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

export default UtilisateurForm