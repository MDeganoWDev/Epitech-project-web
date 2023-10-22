import React, { useEffect, useState } from 'react'
import { putUtilisateur } from '../../../api/put/putUtilisateur';
import { postUtilisateur } from '../../../api/post/postUtilisateur';
import { getUtilisateur } from '../../../api/get/getUtilisateur';
import { useParams, useNavigate } from 'react-router-dom';
import { getNPPermission } from '../../../api/get/getNPPermission';
import { getNPSex } from '../../../api/get/getNPSex';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import type { PermissionType, SexType } from '../../../typings/type';
import { Button } from '../../ui/button';
import { ScrollArea } from '../../ui/scroll-area';

const UtilisateurForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [permissions, setPermissions] = useState<PermissionType[]>([])
  const [sex, setSex] = useState<SexType[]>([])
  const [idUnregister, setIdUnregister] = useState<number | undefined>(undefined)
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [, setOldCv] = useState("");
  const [cv, setCv] = useState<File>();
  const [password, setPassword] = useState("");
  const [idPermission, setIdPermission] = useState("");
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
    if (idPermission) formData.append("permission_id", idPermission.toString());
    if (!idUnregister) formData.append("password", password);
    
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
          setIdPermission(existingUnregister.permission.id.toString())
          setIdSex(existingUnregister.sex.id.toString())
          setLoading(false);
      }      
      fetchData()
    } else {
      setLoading(false)
    }
    const fetchOption = async () => {
      const permission = await getNPPermission();
      const sex = await getNPSex();
      setPermissions(permission)
      setSex(sex)
    }
    fetchOption()
  }, [id])

  if (loading) {
    return <div>Loading</div>
  }

return (
  <div className=" mx-4">
    <h1 className="text-3xl font-bold my-3">{idUnregister ? `Update user ${idUnregister}` : "Create new user"}</h1>
    <form className=" max-w-md gap-3 flex flex-col" onSubmit={handleSubmit}>
    <ScrollArea className="h-[70vh]">
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
      {!idUnregister && (
        <>
          <Label htmlFor="password">Password</Label>
          <Input 
            type="password" 
            name="password" 
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required 
          />
        </>
      )}  
      </div>
      <div>
      <Label htmlFor="permission">Permission</Label>
      <Select
        name="permission"
        defaultValue={idPermission}
        onValueChange={(value: string) => setIdPermission(value)}
        required
      >
        <SelectTrigger>
            <SelectValue placeholder="Permission" />
        </SelectTrigger>
        <SelectContent>
          {permissions.map((permission)=>(
            <SelectItem
            key={permission.id}
            value={permission.id.toString()}
            >{permission.name}</SelectItem>
          ))}
        </SelectContent>
      </Select>
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

export default UtilisateurForm