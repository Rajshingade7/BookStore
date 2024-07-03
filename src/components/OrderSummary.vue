<!-- src/components/OrderSummary.vue -->
<template>
    <div>
      <h2>Order Summary</h2>
      <div v-for="item in cartItems" :key="item._id" class="order-item">
        <img :src="item.product_id.bookImage" alt="Book Image" />
        <div>
          <h3>{{ item.product_id.bookName }}</h3>
          <p>by {{ item.product_id.author }}</p>
          <p>Rs. {{ item.product_id.discountPrice }}</p>
          <p>Quantity: {{ item.quantityToBuy }}</p>
        </div>
      </div>
      <button @click="checkout">Checkout</button>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import { useCartStore } from '../stores/CartStore';
  
  export default defineComponent({
    setup() {
      const cartStore = useCartStore();
  
      const checkout = () => {
        console.log('Checkout with', cartStore.cartItems, cartStore.selectedAddress);
        // Implement checkout logic here
      };
  
      return {
        cartItems: cartStore.cartItems,
        checkout,
      };
    },
  });
  </script>
  
  <style scoped>
  .order-item {
    display: flex;
    margin-bottom: 20px;
  }
  .order-item img {
    width: 100px;
    height: auto;
  }
  .order-item div {
    margin-left: 20px;
  }
  </style>
  