import deleteCompany from "../../api/delete/deleteCompany"

type DeleteCompanyButtonProps = {
    id?: number
}

const DeleteCompanyButton = ({id} : DeleteCompanyButtonProps) => {
    const deleteHandler = () =>{
        deleteCompany(id)
    }
    return (
      <button onClick={deleteHandler}>Delete</button>
    )
}

export default DeleteCompanyButton