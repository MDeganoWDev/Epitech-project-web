import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { PermissionType } from '../../../typings/type';
import { postPermission } from '../../../api/post/postPermission';
import { putPermission } from '../../../api/put/putPermission';
import { getPermission } from '../../../api/get/getPermission';

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
    if (response) navigate(`/admin`);
  }
  
  const HandleCancel = () => {
    navigate(`/admin`);
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
  <div>
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input 
        type="text" 
        name="name" 
        id="name"
        value={name}
        onChange={e => setName(e.target.value)}  
        />
      <button type="submit">Enregister</button>
      <button onClick={HandleCancel}>Annuler</button>
    </form>
  </div>
)
}

export default PermissionForm