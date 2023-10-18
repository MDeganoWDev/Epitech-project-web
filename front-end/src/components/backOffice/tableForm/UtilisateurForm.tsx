import React, { useEffect, useState } from 'react'
import { putUtilisateur } from '../../../api/put/putUtilisateur';
import { postUtilisateur } from '../../../api/post/postUtilisateur';
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
  const [, setOldCv] = useState("");
  const [cv, setCv] = useState<File>();
  const [password, setPassword] = useState("");
  const [idPermission, setIdPermission] = useState<number | undefined>();
  const [idSex, setIdSex] = useState<number | undefined>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let response

    const formData = new FormData();
    formData.append("firstname", firstname);
    formData.append("lastname", lastname);
    formData.append("phone", phone);
    formData.append("email", email);
    formData.append("password", password);
    if (cv) formData.append("cv", cv);
    if (idPermission) formData.append("permission_id", idPermission.toString());
    if (idSex) formData.append("sex_id", idSex.toString());
    
    idUnregister != undefined ? response = await putUtilisateur(idUnregister, formData) : response = await postUtilisateur(formData); 
    if (response) navigate(`/admin/utilisateur`);
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (typeof files === "string") {
      setOldCv(files);
   }else if (files && files.length > 0) {
       setCv(files[0]);
   }
  };
  
  const HandleCancel = () => {
    navigate(`/admin/utilisateur`);
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
          setOldCv(existingUnregister.cv)
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
        required
      />

      <label htmlFor="lastname">Lastname</label>
      <input 
        type="text" 
        name="lastname" 
        id="lastname"
        value={lastname}
        onChange={e => setLastname(e.target.value)} 
        required
      />

      <label htmlFor="phone">Phone</label>
      <input 
        type="phone" 
        name="phone" 
        id="phone"
        value={phone}
        onChange={e => setPhone(e.target.value)} 
        required
      />
      
      <label htmlFor="email">Email</label>
      <input 
        type="email" 
        name="email" 
        id="email"
        value={email}
        onChange={e => setEmail(e.target.value)}  
        required
      />

      <label htmlFor="cv">CV (PDF)</label>
      <input
        type="file"
        accept=".pdf"
        name="cv"
        id="cv"
        onChange={handleFileChange}
      />

      <label htmlFor="password">Password</label>
      <input 
        type="password" 
        name="password" 
        id="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required 
      />

      <label htmlFor="permission_id">Permission id</label>
      <input 
        type="number" 
        name="permission_id" 
        id="permission_id"
        value={idPermission}
        onChange={e => setIdPermission(Number(e.target.value))}
        required
        min={1}  
        />

      <label htmlFor="sex_id">Sex id</label>
      <input 
        type="number" 
        name="sex_id" 
        id="sex_id"
        value={idSex}
        onChange={e => setIdSex(Number(e.target.value))} 
        required
        min={1}
        />

      <button type="submit">Enregister</button>
      <button onClick={HandleCancel}>Annuler</button>
    </form>
  </div>
)
}

export default UtilisateurForm