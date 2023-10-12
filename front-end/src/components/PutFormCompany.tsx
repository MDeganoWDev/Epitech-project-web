import { useEffect, useState } from "react"
import putCompany from "../api/put/putCompany";
import type { CompanyType } from "../typings/type";
import { getCompany } from "../api/get/getCompany";

const PutFormCompany = () => {
    const [idCompany, setIdCompany] = useState();
    const [nameCompany, setNameCompany] = useState("");
    const [addressCompany, setAddressCompany] = useState("");
    const [loading, setLoading] = useState(true);
  
    const handleSubmit = (event) => {
      event.preventDefault()
        const values : CompanyType = {
            id : idCompany,
            name : nameCompany,
            address : addressCompany
        }
        console.log(values)
        putCompany(values);
    }
    
    useEffect(()=>{
        const fetchData = async () => {
          const companyData = await getCompany(1);
          setIdCompany(companyData.id);
          setNameCompany(companyData.name);
          setAddressCompany(companyData.address);
          setLoading(false);
        }
    
        fetchData()
      }, [])
    
      if (loading) {
        return <div>Loading</div>
      } 

  return (
    <form onSubmit={handleSubmit}>
        <label htmlFor="nameCompany">Name</label>
        <input 
        type="text" 
        id="nameCompany" 
        name="nameCompany"
        value={nameCompany}
        onChange={e => setNameCompany(e.target.value)}         
        />

        <label htmlFor="addressCompany">Address</label>
        <input 
        type="text" 
        id="addressCompany" 
        name="addressCompany" 
        value={addressCompany}
        onChange={e => setAddressCompany(e.target.value)}  />

        <button type="submit">Enregistrer</button>
    </form>
  )
}

export default PutFormCompany