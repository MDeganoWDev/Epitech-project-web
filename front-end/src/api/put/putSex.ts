import type { SexType } from "../../typings/type";

const putCompany = async (values : SexType) => {
    return fetch(`http://localhost:8000/sex/${values.id}/`, {
        method: 'PUT',
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

export default putCompany