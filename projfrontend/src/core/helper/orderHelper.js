import {API} from "../../backend";

export const createOrder = (userId, token, data) => {
    return fetch(`${API}/order/create/${userId}`, {
        method: "POST",
        header: {
            Accept: "application-json",
            "Content-Type": "application-json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({order: data})
    })
        .then(response => {
            return response.json();
        }).catch((err => console.log(err)));
};
