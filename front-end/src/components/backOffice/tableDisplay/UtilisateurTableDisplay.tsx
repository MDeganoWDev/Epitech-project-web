import { useNavigate } from "react-router-dom";
import { deleteUtilisateur } from "../../../api/delete/deleteUtilisateur";
import { getUtilisateur } from "../../../api/get/getUtilisateur";
import { useState, useEffect } from "react";
import Pagination from "../../Pagination";
import { Button } from "../../ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table";
import type { UtilisateurType } from "../../../typings/type"

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
        <div className="flex items-center">
        <h2>Utilisateur</h2>
        <Button className="ml-2 bg-green-600 text-white rounded-full h-full" onClick={handleCreateNewUtilisateur}>+</Button>
        </div>
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
                        <TableCell ><a href={utilisateur.cv} target="_blank">{utilisateur.cv ? "Link" : "no cv"}</a></TableCell>
                        <TableCell >{utilisateur.sex?.name}</TableCell>
                        <TableCell >{utilisateur.permission?.name}</TableCell>
                        <TableCell ><button onClick={() => handleEditUtilisateur(utilisateur.id)}>Modifier</button></TableCell>
                        <TableCell ><button onClick={() => handleDeleteUtilisateur(utilisateur.id)}>Supprimer</button></TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
       <Pagination count={count} next={nextPage} prev={prevPage} onPageChange={handlePageChange} />
    </div>
  )
}

export default UtilisateurTableDisplay