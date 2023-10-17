import { useNavigate } from "react-router-dom";
import { deleteAdvertisement } from "../../../api/delete/deleteAdvertisement";
import { useEffect, useState } from "react";
import { AdvertisementType } from "../../../typings/type";
import { getAdvertisement } from "../../../api/get/getAdvertisement";

const AdvertisementTableDisplay = () => {
    const navigate = useNavigate();    
    const [loading, setLoading] = useState(true);
    const [advertisements, setAdvertisements] = useState<AdvertisementType[]>([]);
    const [fiteredId, setFiteredId] = useState<number[]>([]);
    const filteredAdvertisement = advertisements.filter(element => !fiteredId.includes(element.id));
    
    const handleCreateNewAdvertissement = () => {
        navigate(`form`);        
    }
    
    const handleEditAdvertissement = (id? : number) => {
        navigate(`form/${id}`);
    }

    const handleDeleteAdvertissement = (id? : number) => {
        deleteAdvertisement(id)
        if (id) setFiteredId(prevState => [...prevState, id]);
    }
    
    useEffect(()=>{
        const fetchData = async () => {
          const advertisementData = await getAdvertisement();
          setAdvertisements(advertisementData);
        setLoading(false);
        }
    
        fetchData()
      }, [])
    
    if (loading) {
        return <div>Loading</div>
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
                    {filteredAdvertisement.map((advertisement)=>(
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