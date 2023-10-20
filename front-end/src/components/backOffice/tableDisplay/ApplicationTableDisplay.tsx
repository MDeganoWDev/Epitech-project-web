import { useNavigate } from "react-router-dom";
import { deleteApplications } from "../../../api/delete/deleteApplication";
import { getApplication } from "../../../api/get/getApplication";
import { ApplicationType } from "../../../typings/type";
import { useEffect, useState } from "react";
import Pagination from "../../Pagination";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table";
import { Button } from "../../ui/button";
import { PlusSquare } from "lucide-react";


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
        <div className="pt-2">
            <Button className="ml-2 bg-green-700" onClick={handleCreateNewApplication}><PlusSquare className="mr-2"/> Create new application</Button>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Message</TableHead>
                        <TableHead>User ID</TableHead>
                        <TableHead>Company ID</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredApplication.map((application)=>(
                        <TableRow key={application.id}>
                            <TableCell>{application.id}</TableCell>
                            <TableCell>{application.apply_date}</TableCell>
                            <TableCell>{application.message}</TableCell>
                            <TableCell>{application.user ? "Registered : " + application.user.id : "Unregistered : " + application.unregisterUser?.id}</TableCell>
                            <TableCell>{application.advertisement?.company?.id}</TableCell>
                            <TableCell >
                                <Button 
                                className="bg-blue-700 mr-2" 
                                onClick={() => handleEditApplication(application.id)}
                                >Update</Button>
                                <Button 
                                className="bg-red-700"
                                onClick={() => handleDeleteApplication(application.id)}
                                >Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Pagination count={count} next={nextPage} prev={prevPage} onPageChange={handlePageChange} />
        </div>
      )
}

export default ApplicationTableDisplay