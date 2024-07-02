<template>
  <header class="header">
    <div class="logo">
      <img src="../../public/education@2x.png" alt="Logo" class="logo-image" />Bookstore
    </div>
    <input
      type="text"
      placeholder="Search..."
      class="search-bar"
      v-model="localSearchQuery"
    />
    <div class="profile-cart">
      <div class="icon-with-label">
        <v-btn icon>
          <v-icon>mdi-account-outline</v-icon>
        </v-btn>
        <span class="icon-label">Profile</span>
      </div>
      <div class="icon-with-label">
        <v-btn icon>
          <v-icon>mdi-cart-outline</v-icon>
        </v-btn>
        <span class="icon-label">Cart</span>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";

export default defineComponent({
  name: "HeaderComponent",
  props: {
    searchQuery: {
      type: String,
      required: true,
    },
  },
  setup(props, { emit }) {
    const localSearchQuery = ref(props.searchQuery);

    watch(localSearchQuery, (newQuery) => {
      emit("update:searchQuery", newQuery);
    });

    return {
      localSearchQuery,
    };
  },
});
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
