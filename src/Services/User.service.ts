import { Post } from './Axios.service'
class UserService {
  async loginUser(reqData: any) {
    console.log(reqData);
    const url = 'bookstore_user/login';
    const headersOptions = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'token'
      }
    };
    return Post(url, reqData, headersOptions)
      .then((response) => {
        const token = response.data.result.accessToken
        console.log(token)
        localStorage.setItem('token', token)
        return response
      })
      .catch((error) => {
        console.error('Login failed', error)
        throw error
      });
  }
  signupUser(reqData: any) {
    console.log(reqData)
    const url = 'bookstore_user/registration'
    const headersOptions = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'token'
      }
    }
    try {
      const response = Post(url, reqData, headersOptions)
      return response
    } catch (error: any) {
      console.error('There was an error making the POST request', error.message)
      throw error
    }
  }
 
}

export default new UserService()
