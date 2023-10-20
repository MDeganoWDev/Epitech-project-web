import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { PermissionType } from '../../../typings/type';
import { postPermission } from '../../../api/post/postPermission';
import { putPermission } from '../../../api/put/putPermission';
import { getPermission } from '../../../api/get/getPermission';
import { Button } from '../../ui/button';
import { Label } from '../../ui/label';
import { Input } from '../../ui/input';

const PermissionForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [idPermission, setIdPermission] = useState<number | undefined>(undefined)
  const [name, setName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let response
    const values : PermissionType = {
      name : name
    }
    
    idPermission != undefined ? response = await putPermission(idPermission, values) : response = await postPermission(values); 
    if (response) navigate(`/admin/permission`);
  }
  
  const HandleCancel = () => {
    navigate(`/admin/permission`);
  }

  useEffect(()=>{
    if (id != undefined){      
      const currentId = Number(id);
      setIdPermission(currentId);

      const fetchData = async () => {
          const existingPermission = await getPermission(currentId);
          setName(existingPermission.name)
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
    <h1 className="text-3xl font-bold my-3">{idPermission ? `Update permission ${idPermission}` : "Create new permission"}</h1>
    <form className=" max-w-md gap-3 flex flex-col" onSubmit={handleSubmit}>
      <div>
        <Label htmlFor="name">Name</Label>
        <Input 
          type="text" 
          name="name" 
          id="name"
          value={name}
          onChange={e => setName(e.target.value)} 
          required
        />
      </div>
      <div className="grid grid-cols-2 w-full gap-2">
        <Button className="bg-green-700" type="submit">Save</Button>
        <Button className="bg-red-700" onClick={HandleCancel}>Cancel</Button>
      </div>
    </form>
  </div>
)
}

export default PermissionForm