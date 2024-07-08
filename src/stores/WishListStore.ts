import { defineStore } from 'pinia'
import { Get } from '../Services/Axios.service' // Adjust the path according to your project structure

export const useWishListStore = defineStore('wishList', {
  state: () => ({
    wishListItems: [] as Array<any> // Ensure this is always initialized as an array
  }),
  actions: {
    async fetchWishListItems() {
      try {
        console.log('Calling API to fetch wishlist items...')
        const response = await Get('/bookstore_user/get_wishlist_items')
        console.log('API response:', response.data.result)
        this.wishListItems = response.data.result.map((item) => ({
          ...item,
          product_id: item.product_id || {
            bookName: 'Unknown Title',
            author: 'Unknown Author',
            discountPrice: 'N/A',
            price: 'N/A',
            bookImage: 'default-image-url.jpg'
          }
        }));
      } catch (error) {
        console.error('Error fetching wishlist items:', error)
      }
    },
    removeItemFromWishlist(id: string) {
      this.wishListItems = this.wishListItems.filter(item => item.product_id._id !== id);
    }
  }
})
