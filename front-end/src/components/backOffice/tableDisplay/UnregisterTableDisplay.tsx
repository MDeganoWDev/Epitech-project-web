import { useNavigate } from "react-router-dom";
import { deleteUnregister } from "../../../api/delete/deleteUnregister";
import { getUnregister } from "../../../api/get/getUnregister";
import { useState, useEffect } from "react";
import Pagination from "../../Pagination";
import type { UnregisterType } from "../../../typings/type"

const UnregisterTableDisplay = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [unregisters, setUnregisters] = useState<UnregisterType[]>([]);
    const [nextPage, setNextPage] = useState(null);
    const [prevPage, setPrevPage] = useState(null);
    const [count, setCount] = useState(0);    
    const [fiteredId, setFiteredId] = useState<number[]>([]);
    const filteredUnregisters = unregisters.filter(element => !fiteredId.includes(element.id));
    
    const handleCreateNewUnregister = () => {
        navigate(`form`);        
    }
    
    const handleEditUnregister = (id? : number) => {
        navigate(`form/${id}`);
    }
    
    const handleDeleteUnregister = (id? : number) => {
        deleteUnregister(id)
        if (id) setFiteredId(prevState => [...prevState, id]);
    }
    
    useEffect(()=>{
        const fetchData = async () => {
          const unregisterData = await getUnregister();
          setUnregisters(unregisterData.results);
          setNextPage(unregisterData.next);
          setPrevPage(unregisterData.previous);
          setCount(unregisterData.count);
        setLoading(false);
        }
      
        fetchData()
      }, [])
  
      function handlePageChange(url) {
          fetch(url)
            .then(response => response.json())
            .then(data => {
                setUnregisters(data.results);
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
                {filteredUnregisters.map((unregister)=>(
                    <tr key={unregister.id}>
                        <td>{unregister.id}</td>
                        <td>{unregister.firstname}</td>
                        <td>{unregister.lastname}</td>
                        <td>{unregister.email}</td>
                        <td>{unregister.phone}</td>
                        <td><a href={unregister.cv} target="_blank">Link</a></td>
                        <td>{unregister.sex?.name}</td>
                        <td><button onClick={() => handleEditUnregister(unregister.id)}>Modifier</button></td>
                        <td><button onClick={() => handleDeleteUnregister(unregister.id)}>Supprimer</button></td>
                    </tr>
                ))}
            </tbody>
        </table>
        <Pagination count={count} next={nextPage} prev={prevPage} onPageChange={handlePageChange} />
    </div>
  )
}

export default UnregisterTableDisplay