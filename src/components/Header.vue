<template>
  <header class="header">
    <div class="logo" @click="dashboard">
      <img src="../../public/education@2x.png" alt="Logo" class="logo-image" />Bookstore
    </div>
    <input type="text" placeholder="Search..." class="search-bar" v-model="localSearchQuery" />
    <div class="profile-cart">
      <v-menu offset-y>
        <template v-slot:activator="{ props }">
          <div class="icon-with-label">
            <v-btn icon class="end-btn1" v-bind="props">
              <v-icon>mdi-account-outline</v-icon>
          </v-btn>
          <span class="icon-label">Profile</span>
          </div>
        </template>
        <v-card min-width="200">
          <v-list>
            <v-list-item>
              <div style="margin-left:20px;"><b>Welcome Raj....</b></div>
              <v-btn variant="plain" @click="goToProfile"><v-icon>mdi-account-outline</v-icon><span>Profile</span></v-btn><br>
              <v-btn variant="plain" @click="goToOrders"><v-icon>mdi-cart-outline</v-icon><span>My Orders</span></v-btn><br>
              <v-btn variant="plain" @click="goToWishlist"><v-icon>mdi-heart-outline</v-icon><span>My Wishlist</span></v-btn><br>
            </v-list-item>
            <div align="center">
              <v-btn color="red" width="60%" variant="outlined" @click="logout" class="logout">
                Logout
              </v-btn>
            </div>
           
          </v-list>
          
        </v-card>
      </v-menu>
      <div class="icon-with-label">
        
        <v-btn icon @click="goToCart">
          <v-icon>mdi-cart-outline</v-icon>
        </v-btn>
        <span class="icon-label">Cart</span>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent, ref, watch,computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/CartStore';

export default defineComponent({
  name: 'HeaderComponent',
  props: {
    searchQuery: {
      type: String,
      required: true
    }
  },
  setup(props, { emit }) {
    const cartStore = useCartStore();

    const cartItemCount = computed(() => cartStore.cartItems.length);
    const localSearchQuery = ref(props.searchQuery)
    const router = useRouter()
    const goToProfile = () => {
      router.push('/profile')
    }

    const goToOrders = () => {
      router.push('/orders')
    }

    const goToWishlist = () => {
      router.push('/WishList')
    }

    const goToCart = () => {
      router.push('/cart')
    }
    const dashboard = () => {
      router.push('/dashboard')
    }
    const logout = () => {
      localStorage.removeItem('token')
      console.log('Logged out')
    }
    watch(localSearchQuery, (newQuery) => {
      emit('update:searchQuery', newQuery)
    })

    return {
      localSearchQuery,
      goToCart,
      goToProfile,
      goToOrders,
      goToWishlist,
      logout,
      dashboard,
      cartItemCount
    }
  }
})
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #b71c1c;
  padding: 0.3rem 12rem;
  color: white;
}

.logo {
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  font-weight: bold;
}

.logo-image {
  height: 24px;
  margin-right: 0.5rem;
}

.search-bar {
  flex: 1;
  margin: 0 1rem;
  padding: 0.5rem;
  margin-right: 20%;
}
.profile-cart {
  display: flex;
  align-items: center;
}
.profile-cart button {
  margin-left: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: #b71c1c;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.icon-with-label {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 0.5rem;
}

.icon-label {
  font-size: 0.75rem;
  color: white;
  margin-top: 0.25rem;
}
.logout{
  color:red;
}
.first{
  background-color: red;
  color: white;
  border-radius: 50%;
  padding: 0.25rem;
  margin-left: -0.5rem;
}
.cart-badge {
  margin-left: -0.5rem;
  color: white;
}
@media (max-width: 1200px) {
  .header {
    padding: 0.3rem 2rem;
  }

  .search-bar {
    margin-right: 10%;
  }
}

@media (max-width: 768px) {
  .header {
    flex-direction: column;
    align-items: flex-start;
  }

  .search-bar {
    width: 100%;
    margin: 0.5rem 0;
  }

  .profile-cart {
    width: 100%;
    justify-content: space-between;
  }

  .icon-with-label {
    margin: 0;
  }
}

@media (max-width: 480px) {
  .header {
    padding: 0.3rem 1rem;
  }

  .search-bar {
    margin: 0.5rem 0;
    display: none;
  }

  .icon-label {
    display: none;
  }
}
</style>
