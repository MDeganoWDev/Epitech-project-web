import { useState, useEffect } from "react";
import { useTableStore } from "../../store/tableStore";
import AdvertisementTableDisplay from "./AdvertisementTableDisplay";
import ApplicationTableDisplay from "./ApplicationTableDisplay";
import UtilisateurTableDisplay from "./UtilisateurTableDisplay";
import GenericTableDisplay from "./GenericTableDisplay";

const ShowingTable = () => {
    const [selectedTable, SelectedTableName] = useTableStore((state) => [state.selectedTable, state.SelectedTableName]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(!selectedTable);
    }, [selectedTable]);

    if (loading) {
        return <div>Loading</div>;
    } else if (!selectedTable.length) {
        return <div>No data available</div>;
    } else {
        switch (SelectedTableName){
            case "Advertisements" :
                return <AdvertisementTableDisplay advertisements={selectedTable}/>
            case "Applications" :
                return <ApplicationTableDisplay applications={selectedTable}/>
            case "Utilisateurs" :
                return <UtilisateurTableDisplay utilisateurs={selectedTable}/>
            default :
                return <GenericTableDisplay data={selectedTable}/>
           
        }
    }

    
        
    
    

    
};

export default ShowingTable;
