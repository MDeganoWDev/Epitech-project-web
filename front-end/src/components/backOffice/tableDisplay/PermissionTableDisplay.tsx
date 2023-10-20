import { useNavigate } from "react-router-dom";
import type { PermissionType } from "../../../typings/type";
import { deletePermission } from "../../../api/delete/deletePermission";
import { getPermission } from "../../../api/get/getPermission";
import { useEffect, useState } from "react";
import Pagination from "../../Pagination";
import { Button } from "../../ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table";
import { PlusSquare } from "lucide-react";

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
    <div className="pt-2">
      <Button className="ml-2 bg-green-700" onClick={handleCreateNewPermission}><PlusSquare className="mr-2"/> Create new Permission</Button>
      <Table>
          <TableHeader>
              <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
              </TableRow>
          </TableHeader>
          <TableBody>
              {filteredPermissions.map((permission)=>(
                  <TableRow key={permission.id}>
                      <TableCell>{permission.id}</TableCell>
                      <TableCell>{permission.name}</TableCell>
                      <TableCell >
                        <Button 
                        className="bg-blue-700 mr-2" 
                        onClick={() => handleEditPermission(permission.id)}
                        >Update</Button>
                        <Button 
                        className="bg-red-700"
                        onClick={() => handleDeletePermission(permission.id)}
                        >Delete</Button>
                    </TableCell>
                  </TableRow>
              ))}
          </TableBody>
      </Table>
      <Pagination count={count} next={nextPage} prev={prevPage} onPageChange={handlePageChange} />
    </div>
    )
}

export default PermissionTableDisplay