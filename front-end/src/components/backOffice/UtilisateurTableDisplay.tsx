import type { UtilisateurType } from "../../typings/type"
import CreateTableButton from "./CreateTableButton"
import DeleteTableButton from "./DeleteTableButton"
import PutTableButton from "./PutTableButton"

type UtilisateurTableDisplayProps = {
    utilisateurs : UtilisateurType[]
}

const UtilisateurTableDisplay = ({utilisateurs} : UtilisateurTableDisplayProps) => {
  return (
    <div>
        <CreateTableButton/>
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
                        <td><PutTableButton/></td>
                        <td><DeleteTableButton/></td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default UtilisateurTableDisplay