import { Link, useNavigate } from "react-router-dom";
import { deleteCompany } from "../../../api/delete/deleteCompany";
import { getCompany } from "../../../api/get/getCompany";
import { useState, useEffect } from "react";
import Pagination from "../../Pagination";
import { Button } from "../../ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table";
import type { CompanyType } from "../../../typings/type"
import { PlusSquare } from "lucide-react";

const CompanyTableDisplay = () => {
  const navigate = useNavigate();  
  const [loading, setLoading] = useState(true);
  const [companies, setCompanies] = useState<CompanyType[]>([]);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [count, setCount] = useState(0);    
  const [fiteredId, setFiteredId] = useState<number[]>([]);
  const filteredCompanies = companies.filter(element => !fiteredId.includes(element.id));
  
  const handleCreateNewCompany = () => {
      navigate(`form`);        
  }
  
  const handleEditCompany = (id? : number) => {
      navigate(`form/${id}`);
    }
    
    const handleDeleteCompany = (id? : number) => {
        deleteCompany(id)
        if (id) setFiteredId(prevState => [...prevState, id]);
  }

  useEffect(()=>{
    const fetchData = async () => {
      const companiesData = await getCompany();
      setCompanies(companiesData.results);
      setNextPage(companiesData.next);
      setPrevPage(companiesData.previous);
      setCount(companiesData.count);
    setLoading(false);
    }
  
    fetchData()
  }, [])

  function handlePageChange(url) {
      fetch(url)
        .then(response => response.json())
        .then(data => {
            setCompanies(data.results);
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
        <Button className="ml-2 bg-green-700" onClick={handleCreateNewCompany}><PlusSquare className="mr-2"/> Create new Company</Button>
          <Table>
              <TableHeader>
                  <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Adress</TableHead>
                      <TableHead>User id</TableHead>
                  </TableRow>
              </TableHeader>
              <TableBody>
                  {filteredCompanies.map((company)=>(
                      <TableRow key={company.id}>
                          <TableCell>{company.id}</TableCell>
                          <TableCell>{company.name}</TableCell>
                          <TableCell>{company.address}</TableCell>
                          <TableCell><Link to={`/admin/utilisateur-form/${company.user?.id}`}>{company.user?.id}</Link></TableCell>
                          <TableCell >
                          <Button 
                          className="bg-blue-700 mr-2" 
                          onClick={() => handleEditCompany(company.id)}
                          >Update</Button>
                          <Button 
                          className="bg-red-700"
                          onClick={() => handleDeleteCompany(company.id)}
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

export default CompanyTableDisplay