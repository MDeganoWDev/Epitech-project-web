import { useState, useEffect } from "react";
import { useTableStore } from "../../store/tableStore";
import AdvertisementTableDisplay from "./tableDisplay/AdvertisementTableDisplay";
import ApplicationTableDisplay from "./tableDisplay/ApplicationTableDisplay";
import UtilisateurTableDisplay from "./tableDisplay/UtilisateurTableDisplay";
import UnregisterTableDisplay from "./tableDisplay/UnregisterTableDisplay";
import SexTableDisplay from "./tableDisplay/SexTableDisplay";
import PermissionTableDisplay from "./tableDisplay/PermissionTableDisplay";
import CompanyTableDisplay from "./tableDisplay/CompanyTableDisplay";
import ContractTableDisplay from "./tableDisplay/ContractTableDisplay";

const ShowingTable = () => {
    const [selectedTable, SelectedTableName] = useTableStore((state) => [state.selectedTable, state.SelectedTableName]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(!selectedTable);
    }, [selectedTable]);

    if (loading) return <div>Loading</div>;
   
    switch (SelectedTableName){
        case "Advertisements" :
            return <AdvertisementTableDisplay advertisements={selectedTable}/>
        case "Applications" :
            return <ApplicationTableDisplay applications={selectedTable}/>
        case "Utilisateurs" :
            return <UtilisateurTableDisplay utilisateurs={selectedTable}/>
        case "Unregisters" :
            return <UnregisterTableDisplay unregisters={selectedTable}/>
        case "Companies" :
            return <CompanyTableDisplay companies={selectedTable}/>
        case "Contract" :
            return <ContractTableDisplay contracts={selectedTable}/>
        case "Permission" :
            return <PermissionTableDisplay permissions={selectedTable}/>
        case "Sex" :
            return <SexTableDisplay sex={selectedTable}/>
        default :
            return <div>Error table not found</div>    
    }
};

export default ShowingTable;
