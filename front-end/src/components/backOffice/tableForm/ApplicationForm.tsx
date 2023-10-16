import React, { useEffect, useState } from 'react'
import { ApplicationType } from '../../../typings/type';
import { getApplication } from '../../../api/get/getApplication';
import { useParams, useNavigate } from 'react-router-dom';
import { postApplication } from '../../../api/post/postApplication';
import { putApplication } from '../../../api/put/putApplication';

const ApplicationForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [idUnregister, setIdUnregister] = useState<number | undefined>(undefined)
  const [message, setMessage] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [idUser, setIdUser] = useState<number | undefined>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let response
    const values : ApplicationType = {
      message : message,
    }

    isRegistered ? values.user_id = idUser : values.unregisterUser_id = idUser
    
    idUnregister != undefined ? response = await putApplication(idUnregister, values) : response = await postApplication(values); 
    if (response) navigate(`/admin`);
  }
  
  const handleIsRegistered = () =>{
    setIsRegistered(!isRegistered)
  }
  const HandleCancel = () => {
    navigate(`/admin`);
  }

  useEffect(()=>{
    if (id != undefined){      
      const currentId = Number(id);
      setIdUnregister(currentId);

      const fetchData = async () => {
          const existingApplication = await getApplication(currentId);
          setMessage(existingApplication.message)
          if (existingApplication.user) {
            setIdUser(existingApplication.user.id)
            setIsRegistered(true)
          } else {
            setIdUser(existingApplication.unregisterUser.id)
          }
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

      <label htmlFor="message">Message</label>
      <textarea 
        name="message" 
        id="message"
        value={message}
        onChange={e => setMessage(e.target.value)}  
      />

     <label htmlFor="isRegistered">Is Registered</label>
      <input
        type="checkbox"
        name="isRegistered"
        id="isRegistered"
        checked={isRegistered}
        onChange={handleIsRegistered}
      />

     <label htmlFor="idUser">User ID</label>
      <input
        type="number"
        name="idUser"
        id="idUser"
        value={idUser}
        onChange={e => setIdUser(Number(e.target.value))} 
      />

      <button type="submit">Enregister</button>
      <button onClick={HandleCancel}>Annuler</button>
    </form>
  </div>
)
}

export default ApplicationForm