import type { AdvertisementType } from "../../typings/type";

export const postAdvertisement = async (values : AdvertisementType) => {
    return fetch('http://localhost:8000/advertisements/', {
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