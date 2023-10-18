export const putUnregister = async (id : number, formData : FormData) => {
    return fetch(`http://localhost:8000/unregisters/${id}/`, {
        method: 'PATCH',
        body: formData
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