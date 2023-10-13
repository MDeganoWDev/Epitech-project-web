import type { AdvertisementType } from "../../typings/type"
import CreateTableButton from "./CreateTableButton"
import DeleteTableButton from "./DeleteTableButton"
import PutTableButton from "./PutTableButton"

type AdvertisementTableDisplayProps = {
    advertisements : AdvertisementType[]
}

const AdvertisementTableDisplay = ({advertisements}: AdvertisementTableDisplayProps) => {
    return (
        <div>
           <CreateTableButton/>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Date</th>
                        <th>Company</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Contract</th>
                        <th>Wage</th>
                        <th>Hour</th>
                    </tr>
                </thead>
                <tbody>
                    {advertisements.map((advertisement)=>(
                        <tr key={advertisement.id}>
                            <td>{advertisement.id}</td>
                            <td>{advertisement.offerDate}</td>
                            <td>{advertisement.company?.name}</td>
                            <td>{advertisement.title}</td>
                            <td>{advertisement.quick_description}</td>
                            <td>{advertisement.contract?.name}</td>
                            <td>{advertisement.wage}</td>
                            <td>{advertisement.working_time}</td>
                            <td><PutTableButton/></td>
                            <td><DeleteTableButton/></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      )
}

export default AdvertisementTableDisplay