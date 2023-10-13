import { getAdvertisement } from "../../api/get/getAdvertissement"
import { getApplication } from "../../api/get/getApplication"
import { getCompany } from "../../api/get/getCompany"
import { getContract } from "../../api/get/getContract"
import { getPermission } from "../../api/get/getPermission"
import { getSex } from "../../api/get/getSex"
import { getUtilisateur } from "../../api/get/getUtilisateur"
import SelectTableButton from "./SelectTableButton"

const SelectTable = () => {
    const allTable = [
        {name : "Utilisateurs", fetch : getUtilisateur},
        {name : "Companies", fetch : getCompany},
        {name : "Advertisements", fetch : getAdvertisement},
        {name : "Applications", fetch : getApplication},
        {name : "Permission", fetch : getPermission},
        {name : "Contract", fetch : getContract},
        {name : "Sex", fetch : getSex},
    ]
    

  return (
    <div>
        {allTable.map((table)=>(
            <SelectTableButton 
                key={table.name}
                method={table.fetch} 
                name={table.name}
            />
        ))}
    </div>
  )
}

export default SelectTable