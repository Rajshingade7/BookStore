import axios from 'axios';
const BASE_URL = 'https://bookstore.incubation.bridgelabz.com/';
export const Post = (url:string, data:any, config:any) => {
    try {
        return axios.post(BASE_URL + url, data, config);

    } catch (error) {
        console.error("There was an error making the POST request", error);
        throw error;
    }
};
export const Get = (url:any, config={}) => {
    
    try {
        const token=localStorage.getItem('token');
        const headers={
            ...config.headers,
            'x-access-token':token
        }
        return axios.get(BASE_URL + url, {...config,headers});
    } catch (error) {
        console.error("There was an error making the GET request", error);
        throw error;
    }
};