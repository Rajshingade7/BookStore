
<template>
  <Headers :searchQuery="''"></Headers>
  <div class="wishlist">
    <div class="breadcrumb">
      <span>Home</span> / <span>My Wishlist</span>
    </div>
    <div class="wishlist-header">
      <h2>My Wishlist ({{ wishListItems.length }})</h2>
    </div>
    <div v-if="loading" class="loading">Loading...</div>
    <div v-else class="wishlist-items">
      <div v-for="item in wishListItems" :key="item.id" class="wishlist-item">
        <div class="book-image">
          <img src="../../public/Image 11@2x.png" alt="Book Image" />
        </div>
        <div class="book-info">
          <h3>{{ item.product_id.bookName || 'unknown Title' }}</h3>
          <p>by {{ item.product_id.author }}</p>
          <p class="price">
            Rs. {{ item.product_id.discountPrice }}
            <span class="old-price">Rs. {{ item.product_id.price }}</span>
          </p>
        </div>
        <div class="remove-button">
          <button @click="removeFromWishlist(item.product_id._id)">
            <i class="fas fa-trash">
              <v-icon class="custom-icon">mdi-delete</v-icon>
            </i>
          </button>
        </div>
      </div>
    </div>
  </div>
  <Footer></Footer>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue';
import { useWishListStore } from '../stores/WishListStore'; // Adjust the path according to your project structure
import axios from 'axios';
import Headers from './Header.vue';
import Footer from './Footer.vue';

export default defineComponent({
  components: {
    // eslint-disable-next-line vue/no-reserved-component-names
    Headers,
    // eslint-disable-next-line vue/no-reserved-component-names
    Footer,
  },
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Wishlist',
  setup() {
    const wishListStore = useWishListStore();
    const loading = ref(true);
    const wishListItems = computed(() => wishListStore.wishListItems);
   
    onMounted(async () => {
      console.log('Fetching wishlist items...');
      await wishListStore.fetchWishListItems();
      loading.value = false;
      console.log('Fetched wishlist items:', wishListItems.value);
    });

  

    const removeFromWishlist = async (id: string) => {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`https://bookstore.incubation.bridgelabz.com/bookstore_user/remove_wishlist_item/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'x-access-token': token,
          },
        });
        wishListStore.removeItemFromWishlist(id);
      } catch (error) {
        console.error('Error removing item from wishlist:', error);
      }
    };

    return {
      wishListItems,
      loading,
      removeFromWishlist,
    };
  },
});
</script>

<style scoped>
.wishlist {
  padding: 2rem 12rem;

}

.breadcrumb {
  margin-bottom: 1rem;
  color: #777;
}

.wishlist-header {
  background-color: #f5f5f5;
  padding: 1rem;
  margin-bottom: 1rem;
}

.wishlist-header h2 {
  margin: 0;
}

.loading {
  text-align: center;
  padding: 2rem;
}

.wishlist-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.wishlist-item {
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 5px;
}

.book-image img {
  width: 100px;
  height: auto;
  margin-right: 1rem;
}

.book-info {
  flex: 1;
}

.book-info h3 {
  margin: 0;
  font-size: 1.2rem;
}

.book-info p {
  margin: 0.2rem 0;
  color: #555;
}

.price {
  font-weight: bold;
  color: #333;
}

.old-price {
  text-decoration: line-through;
  color: #999;
  margin-left: 0.5rem;
}

.remove-button button {
  background: none;
  border: none;
  cursor: pointer;
  color: #999;
}

.remove-button button:hover {
  color: #f00;
}
</style>