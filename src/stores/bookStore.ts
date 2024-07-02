import { defineStore } from 'pinia';
import getAllBooks from '../Services/Book.service';
export const useBookStore = defineStore('bookStore', {

  state: () => ({
    books: [] as Array<any>,
    loading: false,

  }),
  actions: {
    async fetchBooks() {
        this.loading = true;
        try {
          const response = await getAllBooks();
          console.log(response);
          this.books = response.result; 
        } catch (error) {
          console.error('Error fetching books:', error);
        } finally {
          this.loading = false;
        }
    },
  },
});
