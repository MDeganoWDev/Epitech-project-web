export const getUtilisateur = async (id? : number, token? : string) => {
    const url = id ? `http://localhost:8000/utilisateurs/${id}` : token ? `http://localhost:8000/utilisateurs/auth_token/${token}` : `http://localhost:8000/utilisateurs/`;


    return fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
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