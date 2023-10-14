import { useNavigate } from "react-router-dom";
import type { PermissionType } from "../../../typings/type";
import { deletePermission } from "../../../api/delete/deletePermission";

type PermissionTableDisplayProps = {
  permissions : PermissionType[]
}

const PermissionTableDisplay = ({permissions} : PermissionTableDisplayProps) => {
  const navigate = useNavigate();

  const handleCreateNewPermission = () => {
      navigate(`permission-form`);        
  }
  
  const handleEditPermission = (id? : number) => {
      navigate(`permission-form/${id}`);
  }

  const handleDeletePermission = (id? : number) => {
      deletePermission(id)
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