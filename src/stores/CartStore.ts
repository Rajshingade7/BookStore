import { defineStore } from 'pinia';
import { Get } from '../Services/Axios.service';
export const useCartStore = defineStore('cart', {
  state: () => ({
    cartItems: [],
    selectedAddress: null,
  }),
  actions: {
    async fetchCartItems() {
      try {
        const response = await Get('/bookstore_user/get_cart_items');
        this.cartItems = response.data.result;
        console.log(response.data.result);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    },
    selectAddress(address) {
      this.selectedAddress = address;
    }
  }
});
