import React, { useEffect, useState } from 'react'
import { putUnregister } from '../../../api/put/putUnregister';
import { postUnregister } from '../../../api/post/postUnregister';
import { getUnregister } from '../../../api/get/getUnregister';
import { useParams, useNavigate } from 'react-router-dom';
import type { SexType } from '../../../typings/type';
import { getNPSex } from '../../../api/get/getNPSex';

const UnregisterForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true)  
  const [sex, setSex] = useState<SexType[]>([])
  const [idUnregister, setIdUnregister] = useState<number | undefined>(undefined)
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [, setOldCv] = useState("");
  const [cv, setCv] = useState<File>();
  const [idSex, setIdSex] = useState<number | undefined>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let response

    const formData = new FormData();
    formData.append("firstname", firstname);
    formData.append("lastname", lastname);
    formData.append("phone", phone);
    formData.append("email", email);
    if (cv) formData.append("cv", cv);
    if (idSex) formData.append("sex_id", idSex.toString());

    idUnregister != undefined ? response = await putUnregister(idUnregister, formData) : response = await postUnregister(formData); 
    if (response) navigate(`/admin/unregister`);
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
    navigate(`/admin/unregister`);
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
          setOldCv(existingUnregister.cv)
          setIdSex(existingUnregister.sex.id)
          setLoading(false);
      }      

      fetchData()
    } else {
      setLoading(false)
    }
    const fetchOption = async () => {
      const sex = await getNPSex();
      setSex(sex)
    }
    fetchOption()
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

 
      <label htmlFor="sex">Sex</label>
      <select
        name="sex"
        id="sex"
        value={idSex}
        onChange={e => setIdSex(Number(e.target.value))}
        required
      >
        <option value="">Select Sex</option>
        {sex.map((value)=>(
          <option 
          key={value.id}
          value={value.id}
          >{value.name}</option>
        ))}
      </select>

      <button type="submit">Enregister</button>
      <button onClick={HandleCancel}>Annuler</button>
    </form>
  </div>
)
}

export default UnregisterForm