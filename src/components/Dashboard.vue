<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
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
  beforeCreate() {
    console.log("beforeCreate");
  },
  setup() {
    const router = useRouter();
    const bookStore = useBookStore();
    const loading = ref(true);

    onMounted(async () => {
      try {
        await bookStore.fetchBooks();
        console.log("Books fetched:", bookStore.books.length);

        loading.value = false;
      } catch (error) {
        console.error("Error fetching books:", error);
        loading.value = false;
      }
    });
    const goToBookDetails = (_id: string) => {
      router.push({ name: "bookdetails", params: { _id } });
    };

    return {
      books: bookStore.books,
      loading,
      goToBookDetails,
    };
  },
});
</script>
<template>
  <div id="app">
    <HeaderComponent class="headercomponent" />
    <main v-if="!loading">
      <div class="books1">
        <div>
          <h2>Books</h2>
          ({{ books.length }} Items)
        </div>
      </div>
      <div class="books">
        <BookCard
          v-for="book in books"
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
