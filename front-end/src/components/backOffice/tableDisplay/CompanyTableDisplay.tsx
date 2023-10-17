import { Link, useNavigate } from "react-router-dom";
import type { CompanyType } from "../../../typings/type"
import { deleteCompany } from "../../../api/delete/deleteCompany";
import { getCompany } from "../../../api/get/getCompany";
import { useState, useEffect } from "react";

const CompanyTableDisplay = () => {
  const navigate = useNavigate();  
  const [loading, setLoading] = useState(true);
  const [companies, setCompanies] = useState<CompanyType[]>([]);

  const handleCreateNewCompany = () => {
      navigate(`form`);        
  }
  
  const handleEditCompany = (id? : number) => {
      navigate(`form/${id}`);
  }

  const handleDeleteCompany = (id? : number) => {
      deleteCompany(id)
  }

  useEffect(()=>{
    const fetchData = async () => {
      const companiesData = await getCompany();
      setCompanies(companiesData);
    setLoading(false);
    }

    fetchData()
  }, [])

if (loading) {
    return <div>Loading</div>
}

  return (
      <div>
          <button onClick={handleCreateNewCompany}>Create new company</button>
          <table>
              <thead>
                  <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Adress</th>
                      <th>User id</th>
                  </tr>
              </thead>
              <tbody>
                  {companies.map((company)=>(
                      <tr key={company.id}>
                          <td>{company.id}</td>
                          <td>{company.name}</td>
                          <td>{company.address}</td>
                          <td><Link to={`/admin/utilisateur-form/${company.user?.id}`}>{company.user?.id}</Link></td>
                          <td><button onClick={() => handleEditCompany(company.id)}>Modifier</button></td>
                          <td><button onClick={() => handleDeleteCompany(company.id)}>Supprimer</button></td>
                      </tr>
                  ))}
              </tbody>
          </table>
      </div>
    )
}

export default CompanyTableDisplay