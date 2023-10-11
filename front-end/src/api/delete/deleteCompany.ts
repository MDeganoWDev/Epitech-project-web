import { CompanyType } from "../../typings/type"

const deleteCompany = async (values : CompanyType) => {
    return fetch('http://localhost:8000/companies/', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body : JSON.stringify(values)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        return data;
    })
    .catch(error => {
        console.error("Error : ", error);
        throw error;
    });
}

export default deleteCompany