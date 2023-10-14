import type { UtilisateurType } from "../../typings/type";

export const postUtilisateur = async (values : UtilisateurType) => {
    return fetch('http://localhost:8000/utilisateurs/', {
        method: 'POST',
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
