export const deleteUtilisateur = async (id? : number) => {
    return fetch(`http://localhost:8000/utilisateurs/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    })
   .catch(error => {
        console.error("Error : ", error);
        throw error;
    });
}
