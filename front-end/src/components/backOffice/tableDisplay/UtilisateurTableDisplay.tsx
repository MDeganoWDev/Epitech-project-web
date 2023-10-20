import { useNavigate } from "react-router-dom";
import { deleteUtilisateur } from "../../../api/delete/deleteUtilisateur";
import { getUtilisateur } from "../../../api/get/getUtilisateur";
import { useState, useEffect } from "react";
import Pagination from "../../Pagination";
import { Button } from "../../ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table";
import type { UtilisateurType } from "../../../typings/type"
import { ArrowUpRightFromCircle, CircleOff, PlusSquare } from "lucide-react";

const UtilisateurTableDisplay = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [utilisateurs, setUtilisateurs] = useState<UtilisateurType[]>([]);
    const [nextPage, setNextPage] = useState(null);
    const [prevPage, setPrevPage] = useState(null);
    const [count, setCount] = useState(0);    
    const [fiteredId, setFiteredId] = useState<number[]>([]);
    const filteredUtilisateurs = utilisateurs.filter(element => !fiteredId.includes(element.id));
    
    const handleCreateNewUtilisateur = () => {
        navigate(`form`);        
    }
    
    const handleEditUtilisateur = (id? : number) => {
        navigate(`form/${id}`);
    }

    const handleDeleteUtilisateur = (id? : number) => {
        deleteUtilisateur(id)
        if (id) setFiteredId(prevState => [...prevState, id]);
    }

    useEffect(()=>{
      const fetchData = async () => {
        const utilisateurData = await getUtilisateur();
        setUtilisateurs(utilisateurData.results);
        setNextPage(utilisateurData.next);
        setPrevPage(utilisateurData.previous);
        setCount(utilisateurData.count);
      setLoading(false);
      }
    
      fetchData()
    }, [])

    function handlePageChange(url) {
        fetch(url)
          .then(response => response.json())
          .then(data => {
            setUtilisateurs(data.results);
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
        <Button className="ml-2 bg-green-700" onClick={handleCreateNewUtilisateur}> <PlusSquare className="mr-2"/> Create new User</Button>
        <Table>
            <TableHeader >
                <TableRow>
                    <TableHead >ID</TableHead>
                    <TableHead >Firstname</TableHead>
                    <TableHead >Lastname</TableHead>
                    <TableHead >Email</TableHead>
                    <TableHead >Phone</TableHead>
                    <TableHead >CV</TableHead>
                    <TableHead >Sex</TableHead>
                    <TableHead >Role</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {filteredUtilisateurs.map((utilisateur)=>(
                    <TableRow key={utilisateur.id}>
                        <TableCell >{utilisateur.id}</TableCell>
                        <TableCell >{utilisateur.firstname}</TableCell>
                        <TableCell >{utilisateur.lastname}</TableCell>
                        <TableCell >{utilisateur.email}</TableCell>
                        <TableCell >{utilisateur.phone}</TableCell>
                        <TableCell >
                        {utilisateur.cv ?
                          <a className="text-blue-700 hover:text-green-700" href={utilisateur.cv} target="_blank"> <ArrowUpRightFromCircle /></a> :
                          <div className=" text-red-700"><CircleOff /></div>
                        }
                        </TableCell>
                        <TableCell >{utilisateur.sex?.name}</TableCell>
                        <TableCell >{utilisateur.permission?.name}</TableCell>
                        <TableCell >
                          <Button 
                          className="bg-blue-700 mr-2" 
                          onClick={() => handleEditUtilisateur(utilisateur.id)}
                          >Update</Button>
                          <Button 
                          className="bg-red-700"
                          onClick={() => handleDeleteUtilisateur(utilisateur.id)}
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

export default UtilisateurTableDisplay