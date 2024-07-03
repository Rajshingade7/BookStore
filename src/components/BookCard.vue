<template>
  <div class="book-card" @click="handleClick">
    <div class="image">
      <img src="/public/Image 11@2x.png" alt="Book Image" />
    </div>
    <div class="book-info">
      <h3>{{ book.bookName }}</h3>
      <p>{{ book.author }}</p>
      <div class="rating-par">
        <p class="rating">4.5 ★</p>
        &nbsp;
        <p>({{ book.quantity }})</p>
      </div>
      <p class="price">
        {{ book.discountPrice }} <span class="old-price">{{ book.price }}</span>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

interface Book {
  _id: string;
  image: string;
  title: string;
  author: string;
  quantity: number;
  discountPrice: number;
  price: number;
}

export default defineComponent({
  name: "BookCard",
  props: {
    book: {
      type: Object as PropType<Book>,
      required: true,
    },
  },
  emits: ["book-clicked"],
  methods: {
    handleClick() {
      this.$emit("book-clicked", this.book._id);
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
  width: 233px;
  max-height: 300px;
}
.image {
  background: #f8f5f5;
  display: flex;
  justify-content: center;
}
.book-card img {
  padding: 1rem;
  max-width: 100px;
  height: auto;
  display: block;
}
.book-info {
  padding: 1rem;
  display: flex;
  flex-direction: column;
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
  color: #999;
}
.rating-par {
  display: flex;
  color: #999;
}
.book-info .rating {
  background-color: #17c44e;
  color: white;
  padding: 0 0.2rem;
  border-radius: 3px;
}

.book-info .price {
  color: Black;
  font-weight: bold;
}

.book-info .old-price {
  text-decoration: line-through;
  color: #999;
  font-weight: normal;
}
</style>
