import { useNavigate } from "react-router-dom";

type SelectTableButtonProps = {
  name : string
  route : string
}

const SelectTableButton = ({name, route} : SelectTableButtonProps) => {
    const navigate = useNavigate();

    const handleGetMethod = () => {
        navigate(route);
    };

  return (
    <button 
    className=" bg-blue-700 text-white rounded-xl p-1 mx-1"
    onClick={handleGetMethod}
    >{name}</button>
  )
}

export default SelectTableButton