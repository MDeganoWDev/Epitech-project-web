import { CompanyType, ContractType, PermissionType, SexType } from "../../typings/type";
import CreateTableButton from "./CreateTableButton";
import DeleteTableButton from "./DeleteTableButton";
import PutTableButton from "./PutTableButton";

type GenericTableProps = {
  data : SexType[] | ContractType[] | PermissionType[] | CompanyType[]
}

const GenericTable = ({data} : GenericTableProps) => {
  return (
    <div>
      <CreateTableButton/>
        <table>
            <thead>
                <tr>
                    {Object.keys(data[0]).map((key) => (
                        <th key={key}>{key}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((element) => (
                    <tr key={element.id}>
                        {Object.values(element).map((value, index) => (
                            <td key={index}>{value}</td>
                        ))}
                        <td><PutTableButton/></td>
                        <td><DeleteTableButton/></td>
                    </tr>
                ))}

            </tbody>
        </table>
    </div>
);
}

export default GenericTable