import { useNavigate } from "react-router-dom";
import { useTableStore } from "../../store/tableStore";

type FetchFunction = () => Promise<[]>;

type SelectTableButtonProps = {
    method : FetchFunction
    name : string
}

const SelectTableButton = ({method, name} : SelectTableButtonProps) => {
    const [setSelectedTable, setSelectedTableName] = useTableStore((state)=> [state.setSelectedTable, state.setSelectedTableName])
    const navigate = useNavigate();

    const handleGetMethod = async () => {
        navigate('/admin');
        const data = await method();
        setSelectedTable(data)
        setSelectedTableName(name)
    };

  return (
    <button 
    className=" bg-blue-700 text-white rounded-xl p-1 mx-1"
    onClick={handleGetMethod}
    >{name}</button>
  )
}

export default SelectTableButton