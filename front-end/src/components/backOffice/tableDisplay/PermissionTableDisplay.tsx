import { useNavigate } from "react-router-dom";
import type { PermissionType } from "../../../typings/type";
import { deletePermission } from "../../../api/delete/deletePermission";
import { getPermission } from "../../../api/get/getPermission";
import { useEffect, useState } from "react";
import Pagination from "../../Pagination";

const PermissionTableDisplay = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [permissions, setPermissions] = useState<PermissionType[]>([]);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [count, setCount] = useState(0);    
  const [fiteredId, setFiteredId] = useState<number[]>([]);
  const filteredPermissions = permissions.filter(element => !fiteredId.includes(element.id));
  
  const handleCreateNewPermission = () => {
    navigate(`form`);        
    }
  
  const handleEditPermission = (id? : number) => {
      navigate(`form/${id}`);
    }

  const handleDeletePermission = (id? : number) => {
      deletePermission(id)
      if (id) setFiteredId(prevState => [...prevState, id]);
    }

    useEffect(()=>{
      const fetchData = async () => {
        const permissionData = await getPermission();
        setPermissions(permissionData.results);
        setNextPage(permissionData.next);
        setPrevPage(permissionData.previous);
        setCount(permissionData.count);
      setLoading(false);
      }
    
      fetchData()
    }, [])

    function handlePageChange(url) {
        fetch(url)
          .then(response => response.json())
          .then(data => {
              setPermissions(data.results);
            setNextPage(data.next);
            setPrevPage(data.previous);
            setCount(data.count);
          });
      }
    
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
                  {filteredPermissions.map((permission)=>(
                      <tr key={permission.id}>
                          <td>{permission.id}</td>
                          <td>{permission.name}</td>
                          <td><button onClick={() => handleEditPermission(permission.id)}>Modifier</button></td>
                          <td><button onClick={() => handleDeletePermission(permission.id)}>Supprimer</button></td>
                      </tr>
                  ))}
              </tbody>
          </table>
          <Pagination count={count} next={nextPage} prev={prevPage} onPageChange={handlePageChange} />
      </div>
    )
}

export default PermissionTableDisplay