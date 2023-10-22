import type { ApplicationType } from "../../typings/type";

export const putApplication = async (id : number, values : ApplicationType) => {
    return fetch(`http://localhost:8000/applications/${id}/`, {
        method: 'PATCH',
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
