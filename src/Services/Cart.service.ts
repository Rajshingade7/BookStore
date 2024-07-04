import { Post } from "./Axios.service";
import axios from 'axios';
export const addToCart = async (bookId: string): Promise<void> => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No token found in localStorage');
        }
        const response = await Post('bookstore_user/add_cart_item/' + bookId, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
                'x-access-token': token
            }
        });
        console.log( response.data.message);
    } catch (error) {
        console.error('Failed to add item to cart:', error);
    }
};
export const removeFromCart = async (cartItemId: string): Promise<void> => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found in localStorage');
      }
      const response = await axios.delete(
        'https://bookstore.incubation.bridgelabz.com/bookstore_user/remove_cart_item/' + cartItemId,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'x-access-token': token
          }
        }
      );
      console.log(response.data.message);
    } catch (error) {
      console.error('Failed to remove item from cart:', error);
    }
  };
  
export const updateCartItem = async (cartItemId: string, quantity: number): Promise<void> => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found in localStorage');
      }
      const response = await axios.put(
        'https://bookstore.incubation.bridgelabz.com/bookstore_user/cart_item_quantity/' + cartItemId,
        { quantityToBuy: quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'x-access-token': token
          }
        }
      );
      console.log(response.data.message);
    } catch (error) {
      console.error('Failed to update cart item:', error);
    }
  };
  