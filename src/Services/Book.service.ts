import { Get } from "./Axios.service";

async function getAllBooks() {
    const url='bookstore_user/get/book';
    try {
        const response = await Get(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching books:', error);
        throw error;
    }
}

export default getAllBooks;