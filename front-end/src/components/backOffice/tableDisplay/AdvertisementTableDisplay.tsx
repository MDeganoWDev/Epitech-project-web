import { useNavigate } from "react-router-dom";
import type { AdvertisementType } from "../../../typings/type"
import { deleteAdvertisement } from "../../../api/delete/deleteAdvertissement";

type AdvertisementTableDisplayProps = {
    advertisements : AdvertisementType[]
}

const AdvertisementTableDisplay = ({advertisements}: AdvertisementTableDisplayProps) => {
    const navigate = useNavigate();

    const handleCreateNewAdvertissement = () => {
        navigate(`advertissement-form`);        
    }
    
    const handleEditAdvertissement = (id? : number) => {
        navigate(`advertissement-form/${id}`);
    }

    const handleDeleteAdvertissement = (id? : number) => {
        deleteAdvertisement(id)
    }
    
    return (
        <div>
           <button onClick={handleCreateNewAdvertissement}>Create new advertissement</button>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Date</th>
                        <th>Title</th>
                        <th>Wage</th>
                        <th>Working time</th>
                        <th>Quick description</th>
                        <th>Full description</th>
                        <th>Status</th>
                        <th>Contract</th>
                        <th>Company ID</th>
                    </tr>
                </thead>
                <tbody>
                    {advertisements.map((advertisement)=>(
                        <tr key={advertisement.id}>
                            <td>{advertisement.id}</td>
                            <td>{advertisement.offerDate}</td>
                            <td>{advertisement.title}</td>
                            <td>{advertisement.wage}</td>
                            <td>{advertisement.working_time}</td>
                            <td>{advertisement.quick_description}</td>
                            <td>{advertisement.full_description}</td>
                            <td>{advertisement.isOnline}</td>
                            <td>{advertisement.contract?.name}</td>
                            <td>{advertisement.company?.id}</td>
                            <td><button onClick={()=> handleEditAdvertissement(advertisement.id)}>Modifier</button></td>
                            <td><button onClick={()=> handleDeleteAdvertissement(advertisement.id)}>Supprimer</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      )
}

export default AdvertisementTableDisplay