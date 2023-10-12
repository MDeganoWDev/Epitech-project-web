import { useState } from "react"
import postCompany from "./../api/post/postCompany"

import type { CompanyType } from "../typings/type";

const FormTest = () => {
    const [nameCompany, setNameCompany] = useState("");
    const [addressCompany, setAddressCompany] = useState("");
    
    const handleSubmit = () => {
        const values : CompanyType = {
            name : nameCompany,
            address : addressCompany
        }
        postCompany(values);
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

export default FormTest