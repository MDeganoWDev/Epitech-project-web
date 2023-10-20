import { useAuthStore } from "../../store/authStore";

export const deleteAdvertisement = async (id? : number) => {
    const token = useAuthStore.getState().token;

    return fetch(`http://localhost:8000/advertisements/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
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
