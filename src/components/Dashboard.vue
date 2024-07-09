<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import HeaderComponent from './Header.vue'
import FooterComponent from './Footer.vue'
import BookCard from './BookCard.vue'
import { useRouter } from 'vue-router'
import { useBookStore } from '../stores/bookStore'
export default defineComponent({
  name: 'App',
  components: {
    HeaderComponent,
    FooterComponent,
    BookCard
  },

  setup() {
    const router = useRouter()
    const bookStore = useBookStore()
    const loading = ref(false)
    const searchQuery = ref('')
    const sortOption = ref('Sort By relevance')
    const currentPage = ref(1)
    const itemsPerPage = 12
    const filteredBooks = computed(() => {
      let books = bookStore.books

      if (searchQuery.value) {
        books = books.filter(
          (book) =>
            book.bookName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
            book.author.toLowerCase().includes(searchQuery.value.toLowerCase())
        )
      }

      if (sortOption.value === 'lowToHigh') {
        books = [...books].sort((a, b) => a.discountPrice - b.discountPrice)
      } else if (sortOption.value === 'highToLow') {
        books = books.sort((a, b) => b.discountPrice - a.discountPrice)
      }

      return books
    })
    const paginatedBooks = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage
      const end = start + itemsPerPage
      return filteredBooks.value.slice(start, end)
    })

    const totalPages = computed(() => Math.ceil(filteredBooks.value.length / itemsPerPage))
    const goToBookDetails = (id: string) => {
      router.push({ name: 'bookdetails', params: { id } })
    }
    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value++
      }
    }
    const prevPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--
      }
    }
    return {
      books: bookStore.books,
      loading,
      goToBookDetails,
      searchQuery,
      filteredBooks,
      sortOption,
      paginatedBooks,
      currentPage,
      totalPages,
      nextPage,
      prevPage
    }
  }
})
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
            <select v-model="sortOption" class="sortbyrelevance">
              <option value="Sort By relevance">Sort By Relevance</option>
              <option value="lowToHigh">Price: Low to High</option>
              <option value="highToLow">Price: High to Low</option>
            </select>
          </v-container>
        </div>
      </div>
      <div class="books">
        <BookCard
          v-for="book in paginatedBooks"
          :key="book._id"
          :book="book"
          @book-clicked="goToBookDetails(book._id)"
        />
      </div>
      <div class="pagination">
        <button @click="prevPage" :disabled="currentPage === 1" class="circle-button">
          <span>&lt;</span>
        </button>
        <div class="page-numbers">
          <button
            v-for="page in totalPages"
            :key="page"
            @click="currentPage = page"
            :class="['page-number', { active: currentPage === page }]"
          >
            {{ page }}
          </button>
        </div>
        <button @click="nextPage" :disabled="currentPage === totalPages" class="circle-button">
          <span>&gt;</span>
        </button>
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
  width: 100vw;
  padding: 0rem 12.5rem;
}
.books2 {
  display: flex;
  align-items: center;
  gap: 10px;
}
main {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 2rem 1rem;
}
.sortbyrelevance {
  width: 100%;
  max-width: 250px;
  height: 40px;
}

.books {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 0rem 8rem;
}
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
}
.circle-button {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid #ddd;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 1.5rem;
  transition: background-color 0.3s;
}
.circle-button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
.circle-button:hover:not(:disabled) {
  background-color: #f0f0f0;
}

.page-numbers {
  display: flex;
  gap: 0.5rem;
}
.page-number {
  width: 40px;
  height: 40px;
  border: 1px solid #ddd;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s;
}
.page-number.active {
  background-color: #8d0d0d;
  color: white;
  border-color: #007bff;
}
.page-number:hover:not(.active) {
  background-color: #f0f0f0;
}

@media (min-width: 768px) {
  .books1 {
    padding: 0rem 2rem;
  }

  main {
    padding: 2rem 2rem;
  }

  .books {
    padding: 0rem 2rem;
  }
}

@media (min-width: 1200px) {
  .books1 {
    padding: 0rem 12.5rem;
  }

  .books {
    padding: 0rem 8rem;
  }
}
</style>
