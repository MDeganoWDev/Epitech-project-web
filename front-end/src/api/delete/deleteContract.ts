import { useAuthStore } from "../../store/authStore";

export const deleteContract = async (id? : number) => {
    const token = useAuthStore.getState().token;
    return fetch(`http://localhost:8000/contract/${id}`, {
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
