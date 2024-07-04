<template>
    <Header/>
    <div class="order-confirmation">
      <div class="success-message">
        <img src="/public/image2.png" alt="Order Success" class="success-image" />
        <h1>Order Placed Successfully</h1>
        <img src="/public/image.png" alt="Order Success2" class="success-image2" />

        <p>hurray!!! your order is confirmed<br />the order id is #123456 save the order id for further communication..</p>
      </div>
      <div class="contact-info">
        <table>
          <tr>
            <th>Email us</th>
            <th>Contact us</th>
            <th>Address</th>
          </tr>
          <tr>
            <td>admin@bookstore.com</td>
            <td>+91 8163475881</td>
            <td>42, 14th Main, 15th Cross, Sector 4, opp to BDA complex, near Kumarakom restaurant, HSR Layout, Bangalore 560034</td>
          </tr>
        </table>
      </div>
      <v-btn color="primary" @click="continueShopping">Continue Shopping</v-btn>
    </div>
    <Footer/>
  </template>
  
  <script lang="ts">
  import Header from './Header.vue';
  import Footer from './Footer.vue';
  import { defineComponent } from 'vue';
  import { useRouter } from 'vue-router';
  
  export default defineComponent({
    name: 'OrderConfirmation',
    components: {
      Header,
      Footer,
    },
    setup() {
      const router = useRouter();
  
      const continueShopping = () => {
        router.push('/dashboard');
      };
  
      return {
        continueShopping,
      };
    },
  });
  </script>
  
  <style scoped>
  .order-confirmation {
    text-align: center;
    padding: 2rem;
  }
  
  .success-message {
    margin-bottom: 2rem;
  }
  
  .success-image {
    width: 150px;
    margin-bottom: 1rem;
  }
  
  .contact-info {
    display: flex;
    justify-content: center;
    margin-bottom: 2rem;
  }
  
  .contact-info table {
    width: 100%;
    max-width: 600px;
    border-collapse: collapse;
    text-align: left;
  }
  
  .contact-info th,
  .contact-info td {
    padding: 1rem;
    border: 1px solid #ddd;
  }
  
  .contact-info th {
    background-color: #f2f2f2;
  }
  .success-image{
    width:400px;
    height: auto;
  }

  v-btn {
    display: inline-block;
    margin-top: 1rem;
  }
  </style>
  