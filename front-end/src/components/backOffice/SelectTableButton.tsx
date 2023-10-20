import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

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
    <Button 
    className="text-secondary text-xl mx-3"
    variant="link"
    onClick={handleGetMethod}
    >{name}</Button>
  )
}

export default SelectTableButton