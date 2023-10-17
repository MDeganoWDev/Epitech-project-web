export const postUtilisateur = async (formData : FormData) => {
    return fetch('http://localhost:8000/utilisateurs/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body : formData
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
