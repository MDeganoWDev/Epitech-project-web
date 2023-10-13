import type { ApplicationType } from "../../typings/type"
import CreateTableButton from "./CreateTableButton"
import DeleteTableButton from "./DeleteTableButton"
import PutTableButton from "./PutTableButton"

type ApplicationTableDisplayProps = {
    applications : ApplicationType[]
}

const ApplicationTableDisplay = ({applications}: ApplicationTableDisplayProps) => {
    return (
        <div>
            <CreateTableButton/>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Date</th>
                        <th>Title</th>
                        <th>Company</th>
                        <th>Description</th>
                        <th>Firstname</th>
                        <th>Lastname</th>
                        <th>Message</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>CV</th>
                    </tr>
                </thead>
                <tbody>
                    {applications.map((application)=>(
                        <tr key={application.id}>
                            <td>{application.id}</td>
                            <td>{application.apply_date}</td>
                            <td>{application.advertisement.title}</td>
                            <td>{application.advertisement.company?.name}</td>
                            <td>{application.advertisement.quick_description}</td>
                            <td>{application.firstname}</td>
                            <td>{application.lastname}</td>
                            <td>{application.message}</td>
                            <td>{application.email}</td>
                            <td>{application.phone}</td>
                            <td>{application.cv}</td>
                            <td><PutTableButton/></td>
                            <td><DeleteTableButton/></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      )
}

export default ApplicationTableDisplay