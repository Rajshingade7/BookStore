<template>
  <header class="header">
    <div class="logo">
      <img src="../../public/education@2x.png" alt="Logo" class="logo-image" />Bookstore
    </div>
    <input type="text" placeholder="Search..." class="search-bar" v-model="localSearchQuery" />
    <div class="profile-cart">
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <div class="icon-with-label">
            <v-btn icon v-on="on">
              <v-icon>mdi-account-outline</v-icon>
            </v-btn>
            <span class="icon-label">Profile</span>
          </div>
        </template>
        <v-list>
          <v-list-item @click="goToProfile">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Profile</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="goToOrders">
            <v-list-item-icon>
              <v-icon>mdi-package-variant</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>My Orders</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="goToWishlist">
            <v-list-item-icon>
              <v-icon>mdi-heart</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>My Wishlist</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item @click="logout">
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
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
import { defineComponent, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'HeaderComponent',
  props: {
    searchQuery: {
      type: String,
      required: true
    }
  },
  setup(props, { emit }) {
    const localSearchQuery = ref(props.searchQuery)
    const router = useRouter()
    const goToProfile = () => {
      router.push('/profile')
    }

    const goToOrders = () => {
      router.push('/orders')
    }

    const goToWishlist = () => {
      router.push('/wishlist')
    }

    const goToCart = () => {
      router.push('/cart')
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
      logout
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
</style>
