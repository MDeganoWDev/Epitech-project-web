import { useNavigate } from "react-router-dom";
import { deleteApplications } from "../../../api/delete/deleteApplication";
import { getApplication } from "../../../api/get/getApplication";
import { ApplicationType } from "../../../typings/type";
import { useEffect, useState } from "react";
import Pagination from "../../Pagination";


const ApplicationTableDisplay = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [applications, setApplications] = useState<ApplicationType[]>([]);
    const [nextPage, setNextPage] = useState(null);
    const [prevPage, setPrevPage] = useState(null);
    const [count, setCount] = useState(0);    
    const [fiteredId, setFiteredId] = useState<number[]>([]);
    const filteredApplication = applications.filter(element => !fiteredId.includes(element.id));
    
    const handleCreateNewApplication = () => {
        navigate(`form`);
    }
    
    const handleEditApplication = (id? : number) => {
        navigate(`form/${id}`);
    }
    
    const handleDeleteApplication = (id? : number) => {
        deleteApplications(id)
        if (id) setFiteredId(prevState => [...prevState, id]);
    }

    useEffect(()=>{
        const fetchData = async () => {
          const applicatioData = await getApplication();
          setApplications(applicatioData.results);
          setNextPage(applicatioData.next);
          setPrevPage(applicatioData.previous);
          setCount(applicatioData.count);
        setLoading(false);
        }
      
        fetchData()
      }, [])
    
      function handlePageChange(url) {
          fetch(url)
            .then(response => response.json())
            .then(data => {
                setApplications(data.results);
              setNextPage(data.next);
              setPrevPage(data.previous);
              setCount(data.count);
            });
        }
    
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
                    {filteredApplication.map((application)=>(
                        <tr key={application.id}>
                            <td>{application.id}</td>
                            <td>{application.apply_date}</td>
                            <td>{application.message}</td>
                            <td>{application.user ? "Registered : " + application.user.id : "Unregistered : " + application.unregisterUser?.id}</td>
                            <td>{application.advertisement?.company?.id}</td>
                            <td> <button onClick={() => handleEditApplication(application.id)}>Modifier</button></td>
                            <td> <button onClick={() => handleDeleteApplication(application.id)}>Supprimer</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination count={count} next={nextPage} prev={prevPage} onPageChange={handlePageChange} />
        </div>
      )
}

export default ApplicationTableDisplay