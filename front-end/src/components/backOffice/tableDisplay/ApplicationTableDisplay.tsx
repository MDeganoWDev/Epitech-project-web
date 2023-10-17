import { useNavigate } from "react-router-dom";
import type { ApplicationType } from "../../../typings/type"
import { deleteApplications } from "../../../api/delete/deleteApplication";

type ApplicationTableDisplayProps = {
    applications : ApplicationType[]
}

const ApplicationTableDisplay = ({applications}: ApplicationTableDisplayProps) => {
    const navigate = useNavigate();

    const handleCreateNewApplication = () => {
        navigate(`application-form`);
    }

    const handleEditApplication = (id? : number) => {
        navigate(`application-form/${id}`);
    }

    const handleDeleteApplication = (id? : number) => {
        deleteApplications(id)
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
                                        <td>{application.apply_date ? application.apply_date.toLocaleDateString() : ""}</td>
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