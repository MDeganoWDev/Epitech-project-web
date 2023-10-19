import { useNavigate } from "react-router-dom";
import { deleteUtilisateur } from "../../../api/delete/deleteUtilisateur";
import { getUtilisateur } from "../../../api/get/getUtilisateur";
import { useState, useEffect } from "react";
import type { UtilisateurType } from "../../../typings/type"
import Pagination from "../../Pagination";

const UtilisateurTableDisplay = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [utilisateurs, setUtilisateurs] = useState<UtilisateurType[]>([]);
    const [nextPage, setNextPage] = useState(null);
    const [prevPage, setPrevPage] = useState(null);
    const [count, setCount] = useState(0);    
    const [fiteredId, setFiteredId] = useState<number[]>([]);
    const filteredUtilisateurs = utilisateurs.filter(element => !fiteredId.includes(element.id));
    
    const handleCreateNewUtilisateur = () => {
        navigate(`form`);        
    }
    
    const handleEditUtilisateur = (id? : number) => {
        navigate(`form/${id}`);
    }

    const handleDeleteUtilisateur = (id? : number) => {
        deleteUtilisateur(id)
        if (id) setFiteredId(prevState => [...prevState, id]);
    }

    useEffect(()=>{
      const fetchData = async () => {
        const utilisateurData = await getUtilisateur();
        setUtilisateurs(utilisateurData.results);
        setNextPage(utilisateurData.next);
        setPrevPage(utilisateurData.previous);
        setCount(utilisateurData.count);
      setLoading(false);
      }
    
      fetchData()
    }, [])

    function handlePageChange(url) {
        fetch(url)
          .then(response => response.json())
          .then(data => {
            setUtilisateurs(data.results);
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
        <button onClick={handleCreateNewUtilisateur}>Create new user</button>
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
                    <th>Role</th>
                </tr>
            </thead>
            <tbody>
                {filteredUtilisateurs.map((utilisateur)=>(
                    <tr key={utilisateur.id}>
                        <td>{utilisateur.id}</td>
                        <td>{utilisateur.firstname}</td>
                        <td>{utilisateur.lastname}</td>
                        <td>{utilisateur.email}</td>
                        <td>{utilisateur.phone}</td>
                        <td><a href={utilisateur.cv} target="_blank">Link</a></td>
                        <td>{utilisateur.sex?.name}</td>
                        <td>{utilisateur.permission?.name}</td>
                        <td><button onClick={() => handleEditUtilisateur(utilisateur.id)}>Modifier</button></td>
                        <td><button onClick={() => handleDeleteUtilisateur(utilisateur.id)}>Supprimer</button></td>
                    </tr>
                ))}
            </tbody>
        </table>
       <Pagination count={count} next={nextPage} prev={prevPage} onPageChange={handlePageChange} />
    </div>
  )
}

export default UtilisateurTableDisplay