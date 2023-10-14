import { useNavigate } from "react-router-dom";
import type { UtilisateurType } from "../../../typings/type"
import { deleteUtilisateur } from "../../../api/delete/deleteUtilisateur";

type UtilisateurTableDisplayProps = {
    utilisateurs : UtilisateurType[]
}

const UtilisateurTableDisplay = ({utilisateurs} : UtilisateurTableDisplayProps) => {
    const navigate = useNavigate();

    const handleCreateNewUtilisateur = () => {
        navigate(`utilisateur-form`);        
    }
    
    const handleEditUtilisateur = (id? : number) => {
        navigate(`utilisateur-form/${id}`);
    }

    const handleDeleteUtilisateur = (id? : number) => {
        deleteUtilisateur(id)
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
                    <th>Gender</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>CV</th>
                    <th>Type</th>
                </tr>
            </thead>
            <tbody>
                {utilisateurs.map((utilisateur)=>(
                    <tr key={utilisateur.id}>
                        <td>{utilisateur.id}</td>
                        <td>{utilisateur.firstname}</td>
                        <td>{utilisateur.lastname}</td>
                        <td>{utilisateur.sex.name}</td>
                        <td>{utilisateur.email}</td>
                        <td>{utilisateur.phone}</td>
                        <td>{utilisateur.cv}</td>
                        <td>{utilisateur.permission.name}</td>
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