import { useNavigate } from "react-router-dom";
import type { PermissionType } from "../../../typings/type";
import { deletePermission } from "../../../api/delete/deletePermission";
import { getPermission } from "../../../api/get/getPermission";
import { useEffect, useState } from "react";

const PermissionTableDisplay = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [permissions, setPermissions] = useState<PermissionType[]>([]);

  const handleCreateNewPermission = () => {
      navigate(`form`);        
    }
  
  const handleEditPermission = (id? : number) => {
      navigate(`form/${id}`);
  }

  const handleDeletePermission = (id? : number) => {
      deletePermission(id)
    }

    useEffect(()=>{
      const fetchData = async () => {
        const permissionData = await getPermission();
        setPermissions(permissionData);
      setLoading(false);
      }
    
      fetchData()
    }, [])
    
    if (loading) {
      return <div>Loading</div>
    }

  return (
      <div>
          <button onClick={handleCreateNewPermission}>Create new permission</button>
          <table>
              <thead>
                  <tr>
                      <th>ID</th>
                      <th>Name</th>
                  </tr>
              </thead>
              <tbody>
                  {permissions.map((permission)=>(
                      <tr key={permission.id}>
                          <td>{permission.id}</td>
                          <td>{permission.name}</td>
                          <td><button onClick={() => handleEditPermission(permission.id)}>Modifier</button></td>
                          <td><button onClick={() => handleDeletePermission(permission.id)}>Supprimer</button></td>
                      </tr>
                  ))}
              </tbody>
          </table>
      </div>
    )
}

export default PermissionTableDisplay