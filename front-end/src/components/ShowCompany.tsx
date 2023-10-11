import { useEffect, useState } from "react"
import { getCompany } from "../api/get/getCompany"
import type { CompanyType } from "../typings/type"

const ShowCompany = () => {
  const [companies, setCompanies] = useState<CompanyType[]>([])
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const fetchData = async () => {
      const companyData = await getCompany();
      setCompanies(companyData);
      setLoading(false);
    }

    fetchData()
  }, [])

   if (loading) {
    return <div>Loading</div>
  } 
  console.log(companies)
  return (
    <>
    <div>ooooooooooooook</div>
    {companies.map((company)=>(
      <div key={company.id}>
        <div>name : {company.name}</div>
        <div>address : {company.address}</div>
      </div>
    ))}
    </>
  );
  
}

export default ShowCompany