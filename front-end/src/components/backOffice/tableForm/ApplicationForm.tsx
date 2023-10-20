import React, { useEffect, useState } from 'react'
import { ApplicationType } from '../../../typings/type';
import { getApplication } from '../../../api/get/getApplication';
import { useParams, useNavigate } from 'react-router-dom';
import { postApplication } from '../../../api/post/postApplication';
import { putApplication } from '../../../api/put/putApplication';
import { ScrollArea } from '../../ui/scroll-area';
import { Button } from '../../ui/button';
import { Label } from '../../ui/label';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import { Checkbox } from '../../ui/check-box';

const ApplicationForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [idUnregister, setIdUnregister] = useState<number | undefined>(undefined)
  const [message, setMessage] = useState("");
  const [idAdvertissement, setIdAdvertissement] = useState<number | undefined>();
  const [isRegistered, setIsRegistered] = useState(false);
  const [idUser, setIdUser] = useState<number | undefined>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let response
    const values : ApplicationType = {
      message : message,
      advertisement_id : idAdvertissement
    }

    if (!idUnregister) values.apply_date = new Date().toISOString()
    isRegistered ? values.user_id = idUser : values.unregisterUser_id = idUser
    
    idUnregister != undefined ? response = await putApplication(idUnregister, values) : response = await postApplication(values); 
    if (response) navigate(`/admin/application`);
  }

  const HandleCancel = () => {
    navigate(`/admin/application`);
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
  <div className=" mx-4">
  <h1 className="text-3xl font-bold my-3">{idUnregister ? `Update advertisement ${idUnregister}` : "Create new advertisement"}</h1>
  <form className="flex flex-col max-w-md gap-3" onSubmit={handleSubmit}>
    <ScrollArea className="h-[70vh]">
      <div className="m-1">
      <div className="flex flex-col justify-center content-center">
        <Label htmlFor="isRegistered">Is Registered</Label>
        <Checkbox defaultChecked={isRegistered} onCheckedChange={()=>setIsRegistered(!isRegistered)}/>
        </div>
      <div>
      <Label htmlFor="idAdvertissement">Advertissement ID</Label>
       <Input
         type="number"
         name="idAdvertissement"
         id="idAdvertissement"
         value={idAdvertissement}
         onChange={e => setIdAdvertissement(Number(e.target.value))}
         required
         min={1}
       />
      </div>
        <div>
     <Label htmlFor="idUser">User ID</Label>
      <Input
        type="number"
        name="idUser"
        id="idUser"
        value={idUser}
        onChange={e => setIdUser(Number(e.target.value))}
        required
        min={1}
      />
      </div>
      <div>
      <Label htmlFor="message">Message</Label>
      <Textarea 
        name="message" 
        id="message"
        value={message}
        onChange={e => setMessage(e.target.value)}
        required  
      />
           </div>
      </div>
      </ScrollArea>
      <div className="grid grid-cols-2 w-full gap-2">
        <Button className="bg-green-700" type="submit">Save</Button>
        <Button className="bg-red-700" onClick={HandleCancel}>Cancel</Button>
      </div>
      </form>
  </div>
)
}

export default ApplicationForm