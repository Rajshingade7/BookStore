<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import HeaderComponent from "./Header.vue";
import FooterComponent from "./Footer.vue";
import BookCard from "./BookCard.vue";
import { useRouter } from "vue-router";
import { useBookStore } from "../stores/bookStore";
export default defineComponent({
  name: "App",
  components: {
    HeaderComponent,
    FooterComponent,
    BookCard,
  },

  setup() {
    const router = useRouter();
    const bookStore = useBookStore();
    const loading = ref(false);
    const searchQuery = ref("");
    const sortOption = ref("default");

    const filteredBooks = computed(() => {
      let books = bookStore.books;

      if (searchQuery.value) {
        books = books.filter(
          (book) =>
            book.bookName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
            book.author.toLowerCase().includes(searchQuery.value.toLowerCase())
        );
      }

      if (sortOption.value === "lowToHigh") {
        books = [...books].sort((a, b) => a.price - b.price);
      } else if (sortOption.value === "highToLow") {
        books = books.sort((a, b) => b.price - a.price);
      }

      return books;
    });
    const goToBookDetails = (id: string) => {
      router.push({ name: "bookdetails", params: { id } });
    };
    return {
      books: bookStore.books,
      loading,
      goToBookDetails,
      searchQuery,
      filteredBooks,
      sortOption,
    };
  },
});
</script>
<template>
  <div id="app">
    <HeaderComponent class="headercomponent" v-model:searchQuery="searchQuery" />
    <main v-if="!loading">
      <div class="books1">
        <div>
          <h2>Books</h2>
          ({{ filteredBooks.length }} Items)
        </div>
        <div>
          <v-select
            v-model="sortOption"
            :items="['default', 'lowToHigh', 'highToLow']"
            label="Sort By Price"
          >
          </v-select>
        </div>
      </div>
      <div class="books">
        <BookCard
          v-for="book in filteredBooks"
          :key="book._id"
          :book="book"
          @book-clicked="goToBookDetails(book._id)"
        />
      </div>
    </main>
    <FooterComponent />
  </div>
</template>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.books1 {
  display: flex;
  justify-content: space-between;
  padding: 0rem 8rem;
}
main {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 2rem;
}

.books {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 0rem 8rem;
}
</style>
