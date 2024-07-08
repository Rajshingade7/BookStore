import { Post, Delete,Get } from "./Axios.service"

const addwishlist = async (bookId: string) => {
  try {
    const token = localStorage.getItem('token')
    const config = { headers: { 'x-access-token': token } }

    const response = await Post(`bookstore_user/add_wish_list/${bookId}`,null,config)
    return response.data
  } catch (error) {
    console.error('Error adding item to wishlist:', error)
    throw error
  }
}

const removeWishlist = async (productId: string) => {
  try {
    const token = localStorage.getItem('token')
    const config = { headers: { 'x-access-token': token } }

    const response = await Delete(`bookstore_user/remove_wishlist_item/${productId}`, config)
    return response.data
  } catch (error) {
    console.error('Error removing item from wishlist:', error)
    throw error
  }
}

export default { addwishlist, removeWishlist}
