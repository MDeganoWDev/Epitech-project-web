import { Link, useNavigate } from "react-router-dom";
import type { CompanyType } from "../../../typings/type"
import { deleteCompany } from "../../../api/delete/deleteCompany";

type CompanyTableDisplayProps = {
  companies : CompanyType[]
}
const CompanyTableDisplay = ({companies} : CompanyTableDisplayProps) => {
  const navigate = useNavigate();

  const handleCreateNewCompany = () => {
      navigate(`company-form`);        
  }
  
  const handleEditCompany = (id? : number) => {
      navigate(`company-form/${id}`);
  }

  const handleDeleteCompany = (id? : number) => {
      deleteCompany(id)
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