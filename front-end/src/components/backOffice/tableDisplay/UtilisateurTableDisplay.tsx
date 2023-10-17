import { useNavigate } from "react-router-dom";
import { deleteUtilisateur } from "../../../api/delete/deleteUtilisateur";
import { getUtilisateur } from "../../../api/get/getUtilisateur";
import { useState, useEffect } from "react";
import type { UtilisateurType } from "../../../typings/type"

const UtilisateurTableDisplay = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [utilisateurs, setUtilisateurs] = useState<UtilisateurType[]>([]);
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
        setUtilisateurs(utilisateurData);
      setLoading(false);
      }
    
      fetchData()
    }, [])
    
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
                        <td><embed src={utilisateur.cv} width="800px" height="600px" /></td>
                        <td>{utilisateur.sex?.name}</td>
                        <td>{utilisateur.permission?.name}</td>
                        <td><button onClick={() => handleEditUtilisateur(utilisateur.id)}>Modifier</button></td>
                        <td><button onClick={() => handleDeleteUtilisateur(utilisateur.id)}>Supprimer</button></td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default UtilisateurTableDisplay