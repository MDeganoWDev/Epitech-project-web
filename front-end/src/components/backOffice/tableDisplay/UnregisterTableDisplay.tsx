import { useNavigate } from "react-router-dom";
import { deleteUnregister } from "../../../api/delete/deleteUnregister";
import { getUnregister } from "../../../api/get/getUnregister";
import { useState, useEffect } from "react";
import type { UnregisterType } from "../../../typings/type"

const UnregisterTableDisplay = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [unregisters, setUnregisters] = useState<UnregisterType[]>([]);

    const handleCreateNewUnregister = () => {
        navigate(`form`);        
    }
    
    const handleEditUnregister = (id? : number) => {
        navigate(`form/${id}`);
    }

    const handleDeleteUnregister = (id? : number) => {
        deleteUnregister(id)
    }
    
    useEffect(()=>{
      const fetchData = async () => {
        const unregistersData = await getUnregister();
        setUnregisters(unregistersData);
      setLoading(false);
      }
    
      fetchData()
    }, [])
    
    if (loading) {
      return <div>Loading</div>
    }

    return (
        <div>
        <button onClick={handleCreateNewUnregister}>Create new unregister user</button>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Firstname</th>
                    <th>Lastname</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>CV</th>
                    <th>Sex</th>
                </tr>
            </thead>
            <tbody>
                {unregisters.map((unregister)=>(
                    <tr key={unregister.id}>
                        <td>{unregister.id}</td>
                        <td>{unregister.firstname}</td>
                        <td>{unregister.lastname}</td>
                        <td>{unregister.email}</td>
                        <td>{unregister.phone}</td>
                        <td><embed src={unregister.cv} width="800px" height="600px" /></td>
                        <td>{unregister.sex?.name}</td>
                        <td><button onClick={() => handleEditUnregister(unregister.id)}>Modifier</button></td>
                        <td><button onClick={() => handleDeleteUnregister(unregister.id)}>Supprimer</button></td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default UnregisterTableDisplay