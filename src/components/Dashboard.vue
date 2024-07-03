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
    const sortOption = ref("Sort By relevance");

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
        books = [...books].sort((a, b) => a.discountPrice - b.discountPrice);
      } else if (sortOption.value === "highToLow") {
        books = books.sort((a, b) => b.discountPrice - a.discountPrice);
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
        <div class="books2">
          <h2>Books</h2>
          ({{ filteredBooks.length }} Items)
        </div>
        <div>
          <v-container>
            <v-select
            v-model="sortOption"
            class="sortbyrelevance"
            variant="outlined"
            :items="['Sort By relevance', 'lowToHigh', 'highToLow']"
            >
          </v-select>
          </v-container>
          
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

.books1{
  display:flex;
  justify-content: space-between;
  width:100vw;
  padding:0rem 12.5rem;
}
.books2{
  display:flex;
  align-items: center;
  gap: 10px;
}
main {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 2rem;
}
.sortbyrelevance{
  width:250px;
}

.books {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 0rem 8rem;
}
</style>
