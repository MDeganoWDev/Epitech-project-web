import { useNavigate } from 'react-router-dom'
import { deleteSex } from '../../../api/delete/deleteSex'
import type { SexType } from '../../../typings/type'

type UnregisterTableDisplayProps = {
    sex : SexType[]
}

const SexTableDisplay = ({sex} : UnregisterTableDisplayProps) => {
    const navigate = useNavigate();

    const handleCreateNewSex = () => {
        navigate(`sex-form`);        
    }
    
    const handleEditSex = (id? : number) => {
        navigate(`sex-form/${id}`);
    }

    const handleDeleteSex = (id? : number) => {
        deleteSex(id)
    }

    return (
        <div>
            <button onClick={handleCreateNewSex}>Create new sex</button>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {sex.map((element)=>(
                        <tr key={element.id}>
                            <td>{element.id}</td>
                            <td>{element.name}</td>
                            <td><button onClick={() => handleEditSex(element.id)}>Modifier</button></td>
                            <td><button onClick={() => handleDeleteSex(element.id)}>Supprimer</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      )
}

export default SexTableDisplay