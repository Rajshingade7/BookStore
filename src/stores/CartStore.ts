import { defineStore } from 'pinia';
import { Get } from '../Services/Axios.service';
export const useCartStore = defineStore('cart', {
  state: () => ({
    cartItems: [] as CartItem[],
    selectedAddress: null as Address | null,
  }),
  actions: {
    async fetchCartItems() {
      try {
        const response = await Get('/bookstore_user/get_cart_items');
        this.cartItems = response.data.result as CartItem[];
        console.log(response.data.result);
        console.log(this.cartItems);
      }catch (error) {
        console.error('Error fetching cart items:', error);
      }
    },
    selectAddress(address:any) {
      this.selectedAddress = address;
    }
  }
});



interface User {
  address: Address[];
  createdAt: string;
  email: string;
  fullName: string;
  isVerified: boolean;
  phone: string;
  updatedAt: string;
  __v: number;
  _id: string;
}


interface Product {
  bookName: string;
  author: string;
  discountPrice: number;
  price: number;
  quantity: number;
  _id: string;
}

interface CartItem {
  user_id: User | undefined
  product_id: Product;
  admin_user_id: string;
  quantityToBuy: number;
  _id: string;
}
interface Address {
  fullAddress: string;
  mobileNumber: string;
  city: string;
  state: string;
  addressType: string;
  type: string;

}