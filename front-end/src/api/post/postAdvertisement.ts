import type { AdvertisementType } from "../../typings/type";
import { useAuthStore } from "../../store/authStore";

export const postAdvertisement = async (values: AdvertisementType) => {
    const token = useAuthStore.getState().token;
    return fetch('http://localhost:8000/advertisements/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        body: JSON.stringify(values)
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