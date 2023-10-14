import type { UtilisateurType } from "../../typings/type";

export const putUtilisateur = async (id : number, values : UtilisateurType) => {
    return fetch(`http://localhost:8000/utilisateurs/${id}/`, {
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