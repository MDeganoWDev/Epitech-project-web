import SelectTableButton from "./SelectTableButton"

const SelectTable = () => {
    const allTable = [
        {name : "Users", route : "utilisateur"},
        {name : "Unregisters", route : "unregister"},
        {name : "Companies", route : "company"},
        {name : "Advertisements", route : "advertisement"},
        {name : "Applications", route : "application"},
        {name : "Permission", route : "permission"},
        {name : "Contract", route : "contract"},
        {name : "Genders", route : "sex"},
    ]
    

  return (
    <div className="flex justify-between bg-primary">
        {allTable.map((table)=>(
            <SelectTableButton 
                key={table.name}
                route={table.route} 
                name={table.name}
            />
        ))}
    </div>
  )
}

export default SelectTable