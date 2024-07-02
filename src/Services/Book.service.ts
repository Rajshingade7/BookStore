import { Get, Post } from './Axios.service'

async function getAllBooks() {
  const url = 'bookstore_user/get/book'
  try {
    const response = await Get(url)
    return response.data
  } catch (error) {
    console.error('Error fetching books:', error)
    throw error
  }
}

export const getFeedback = (id: string) => {
  const token = localStorage.getItem('token')
  const headers = {
    'x-access-token': token
  }
  console.log(`bookstore_user/get/feedback/${id}`)
  return Get(`bookstore_user/get/feedback/${id}`, { headers })
  
}

export const setFeedback = (id: string, feed: Object) => {
  const key = localStorage.getItem('API_KEY')
  console.log(key)
  const headers = {
    'x-access-token': key
  }
  return Post(`bookstore_user/add/feedback/${id}`, feed, { headers })
}
export default getAllBooks
