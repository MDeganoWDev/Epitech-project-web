import { useNavigate } from "react-router-dom";
import { deleteApplications } from "../../../api/delete/deleteApplication";
import { getApplication } from "../../../api/get/getApplication";
import { ApplicationType } from "../../../typings/type";
import { useEffect, useState } from "react";


const ApplicationTableDisplay = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [applications, setApplications] = useState<ApplicationType[]>([]);

    const handleCreateNewApplication = () => {
        navigate(`form`);
    }

    const handleEditApplication = (id? : number) => {
        navigate(`form/${id}`);
    }

    const handleDeleteApplication = (id? : number) => {
        deleteApplications(id)
    }

    useEffect(()=>{
        const fetchData = async () => {
          const applicationData = await getApplication();
          setApplications(applicationData);
        setLoading(false);
        }
    
        fetchData()
      }, [])
    
    if (loading) {
        return <div>Loading</div>
    }

    return (
        <div>
            <button onClick={handleCreateNewApplication}>Create new application</button>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Date</th>
                        <th>Message</th>
                        <th>User ID</th>
                        <th>Company ID</th>
                    </tr>
                </thead>
                <tbody>
                    {applications.map((application)=>(
                        <tr key={application.id}>
                            <td>{application.id}</td>
                            <td>{application.apply_date instanceof Date ? application.apply_date.toISOString() : ""}</td>
                            <td>{application.message}</td>
                            <td>{application.user ? "Registered : " + application.user.id : "Unregistered : " + application.unregisterUser?.id}</td>
                            <td>{application.advertisement?.company?.id}</td>
                            <td> <button onClick={() => handleEditApplication(application.id)}>Modifier</button></td>
                            <td> <button onClick={() => handleDeleteApplication(application.id)}>Supprimer</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      )
}

export default ApplicationTableDisplay