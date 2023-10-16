import { useNavigate } from "react-router-dom";
import { deleteUnregister } from "../../../api/delete/deleteUnregister";
import type { UnregisterType } from "../../../typings/type"

type UnregisterTableDisplayProps = {
    unregisters : UnregisterType[]
}

const UnregisterTableDisplay = ({unregisters} : UnregisterTableDisplayProps) => {
    const navigate = useNavigate();

    const handleCreateNewUnregister = () => {
        navigate(`unregister-form`);        
    }
    
    const handleEditUnregister = (id? : number) => {
        navigate(`unregister-form/${id}`);
    }

    const handleDeleteUnregister = (id? : number) => {
        deleteUnregister(id)
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
                        <td>{unregister.cv}</td>
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