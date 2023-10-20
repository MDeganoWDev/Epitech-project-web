import React, { useEffect, useState } from 'react'
import { putUnregister } from '../../../api/put/putUnregister';
import { postUnregister } from '../../../api/post/postUnregister';
import { getUnregister } from '../../../api/get/getUnregister';
import { useParams, useNavigate } from 'react-router-dom';
import { getNPSex } from '../../../api/get/getNPSex';
import type { SexType } from '../../../typings/type';
import { ScrollArea } from '../../ui/scroll-area';
import { Button } from '../../ui/button';
import { Label } from '../../ui/label';
import { Input } from '../../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';

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
  const [idSex, setIdSex] = useState("");

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
          setIdSex(existingUnregister.sex.id.toString())
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
  <div className=" mx-4">
  <h1 className="text-3xl font-bold my-3">{idUnregister ? `Update unregister ${idUnregister}` : "Create new unregister"}</h1>
    <form className=" max-w-md gap-3 flex flex-col" onSubmit={handleSubmit}>
    <ScrollArea className="max-h-[70vh]">
      <div className="m-1">
      <div>
      <Label htmlFor="firstname">Firstname</Label>
      <Input 
        type="text" 
        name="firstname" 
        id="firstname"
        value={firstname}
        onChange={e => setFirstname(e.target.value)} 
        required
      />
      </div>
      <div>
      <Label htmlFor="lastname">Lastname</Label>
      <Input 
        type="text" 
        name="lastname" 
        id="lastname"
        value={lastname}
        onChange={e => setLastname(e.target.value)} 
        required
      />
      </div>
      <div>
      <Label htmlFor="phone">Phone</Label>
      <Input 
        type="phone" 
        name="phone" 
        id="phone"
        value={phone}
        onChange={e => setPhone(e.target.value)}
        required  
      />
      </div>
      <div>
      <Label htmlFor="email">Email</Label>
      <Input 
        type="email" 
        name="email" 
        id="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required 
      />
      </div>
      <div>
      <Label htmlFor="cv">CV (PDF)</Label>
      <Input
        type="file"
        accept=".pdf"
        name="cv"
        id="cv"
        onChange={handleFileChange}
      />
      </div>
      <div> 
      <Label htmlFor="sex">Sex</Label>
      <Select
        name="sex"
        defaultValue={idSex}
        onValueChange={(value: string) => setIdSex(value)}
        required
      >
        <SelectTrigger>
            <SelectValue placeholder="Gender" />
         </SelectTrigger>
         <SelectContent>
        {sex.map((value)=>(
          <SelectItem 
          key={value.id}
          value={value.id.toString()}
          >{value.name}</SelectItem>
        ))}
        </SelectContent>
      </Select>
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

export default UnregisterForm