<!-- src/components/AddressDetails.vue -->
<template>
    <div>
      <h2>Customer Details</h2>
      <form @submit.prevent="selectAddress">
        <div>
          <label for="fullName">Full Name</label>
          <input id="fullName" v-model="fullName" required />
        </div>
        <div>
          <label for="mobileNumber">Mobile Number</label>
          <input id="mobileNumber" v-model="mobileNumber" required />
        </div>
        <div>
          <label for="address">Address</label>
          <textarea id="address" v-model="address" required></textarea>
        </div>
        <div>
          <label for="city">City/Town</label>
          <input id="city" v-model="city" required />
        </div>
        <div>
          <label for="state">State</label>
          <input id="state" v-model="state" required />
        </div>
        <div>
          <label>Type</label>
          <input type="radio" id="home" value="Home" v-model="type" />
          <label for="home">Home</label>
          <input type="radio" id="work" value="Work" v-model="type" />
          <label for="work">Work</label>
          <input type="radio" id="other" value="Other" v-model="type" />
          <label for="other">Other</label>
        </div>
        <button type="submit">Continue</button>
      </form>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { useCartStore } from '../stores/CartStore';
  
  export default defineComponent({
    setup() {
      const cartStore = useCartStore();
      const fullName = ref('');
      const mobileNumber = ref('');
      const address = ref('');
      const city = ref('');
      const state = ref('');
      const type = ref('Home');
  
      const selectAddress = () => {
        const selectedAddress = {
          fullName: fullName.value,
          mobileNumber: mobileNumber.value,
          address: address.value,
          city: city.value,
          state: state.value,
          type: type.value,
        };
        cartStore.selectAddress(selectedAddress);
        cartStore.$router.push({ name: 'OrderSummary' });
      };
  
      return {
        fullName,
        mobileNumber,
        address,
        city,
        state,
        type,
        selectAddress,
      };
    },
  });
  </script>
  
  <style scoped>
  form div {
    margin-bottom: 10px;
  }
  </style>
  