
const userFromLocalStorage = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : '';

export const config = {
    headers:{
       Authorization: `Bearer ${userFromLocalStorage.token ? userFromLocalStorage.token : ''}`,
       Accept: "application/json",
    }
}