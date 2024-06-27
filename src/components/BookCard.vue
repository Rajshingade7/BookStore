<template>
  <div class="book-card">
  <div class="image">
  <img :src="book.image" alt="Book Image" />
  </div> 
    <div class="book-info">
      <h3>{{ book.title }}</h3>
      <p>{{ book.author }}</p>
      <div class="rating-par">
        <p class="rating">4.5 ★</p>
        &nbsp;
        <p> (20) </p>
      </div>
      <p class="price">Rs. 1500 <span class="old-price">Rs. 2000</span></p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

interface Book {
  image: string;
  title: string;
  author: string;
}

export default defineComponent({
  name: 'BookCard',
  props: {
    book: {
      type: Object as PropType<Book>,
      required: true,
    },
  },
});
</script>

<style scoped>
.book-card {
  border: 1px solid #ddd;
  border-radius: 5px;
  overflow: hidden;
  margin: 1rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  height:auto;
  max-height: 270px;
}
.image{
  background:#f8f5f5;
  display:flex;
  justify-content:center;
}
.book-card img {
  padding:1rem;
  max-width: 100px;
  height: auto;
  display: block;

}
.book-info{
  padding:1rem;
  display:flex;
  flex-direction:column;
  align-content: left;
  align-items: flex-start;
gap: 0.2rem;
}

.book-info h3 {
  margin: 0;
  font-size: 1rem;
  font-weight: bold;
}
.book-info p {
  margin: 0.2rem 0; 
  color:#999
}
.rating-par{
  display: flex;
  color:#999
}
.book-info .rating {
  background-color: #17c44e;
  color:white;
}

.book-info .price {
  color:Black;
  font-weight: bold;
}

.book-info .old-price {
  text-decoration: line-through;
  color: #999;
  font-weight: normal;
}
</style>
