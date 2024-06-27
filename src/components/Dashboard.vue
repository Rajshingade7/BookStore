<template>
  <div id="app">
    <HeaderComponent />
    <main>
      <div class="books">
        <BookCard
          v-for="(book, index) in books"
          :key="index"
          :book="book"
        />
      </div>
    </main>
    <FooterComponent />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HeaderComponent from './Header.vue';
import FooterComponent from './Footer.vue';
import BookCard from './BookCard.vue';

export default defineComponent({
  name: 'App',
  components: {
    HeaderComponent,
    FooterComponent,
    BookCard,
  },
  data() {
    return {
      books: [
        { image: '../../public/loginimage.png', title: "Don't Make Me Think", author: 'Steve Krug' },
        { image: '../../public/loginimage.png', title: 'React Material-UI', author: 'Author Name' },
        { image: '../../public/loginimage.png', title: "Don't Make Me Think", author: 'Steve Krug' },
        { image: '../../public/loginimage.png', title: "Don't Make Me Think", author: 'Steve Krug' },
        { image: '../../public/loginimage.png', title: "Don't Make Me Think", author: 'Steve Krug' },

        // Add more books as needed
      ],
    };
  },
});
</script>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
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
}
</style>
