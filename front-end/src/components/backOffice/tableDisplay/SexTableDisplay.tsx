import { useNavigate } from 'react-router-dom'
import { deleteSex } from '../../../api/delete/deleteSex'
import { useEffect, useState } from 'react'
import { getSex } from '../../../api/get/getSex'
import type { SexType } from '../../../typings/type'

const SexTableDisplay = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [sex, setSex] = useState<SexType[]>([]);
    const [fiteredId, setFiteredId] = useState<number[]>([]);
    const filteredSex = sex.filter(element => !fiteredId.includes(element.id));
       
    const handleCreateNewSex = () => {
        navigate(`form`);        
    }
    
    const handleEditSex = (id? : number) => {
        navigate(`form/${id}`);
    }

    const handleDeleteSex = (id? : number) => {
        deleteSex(id)
        if (id) setFiteredId(prevState => [...prevState, id]);
    }

    useEffect(()=>{
        const fetchData = async () => {
          const sexData = await getSex();
          setSex(sexData);
        setLoading(false);
        }
    
        fetchData()
      }, [])
    
    if (loading) {
        return <div>Loading</div>
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
                    {filteredSex.map((element)=>(
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