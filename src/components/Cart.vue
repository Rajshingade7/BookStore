<template>
    <Header class="headercomponent" />

  <div class="cart">
    <v-breadcrumbs :items="['Home', 'My cart']"></v-breadcrumbs>

    <div class="mycart">
        <div class="carthead">
            <h2>My Cart ({{ cartItems.length }})</h2>
            <select class="locationselect">
                <option value="Bridgelabz LLP">
                    Bridgelabz Solutino LLP, No...</option>
            </select>
        </div>
      <div v-for="item in cartItems" :key="item._id" class="cart-item">
        <img src="../../public/Image 23@2x.png" alt="Book Image" />
        <div>
          <h3>{{ item.product_id.bookName }}</h3>
          <p>by {{ item.product_id.author }}</p>
          <p>
            Rs. {{ item.product_id.discountPrice }}
            <span class="u-smalltext-b pl-3"
              ><strike>{{ item.product_id.price }}</strike></span
            >
          </p>
          <div class="cartbtn">
            <button @click="decrementQuantity(item)">-</button>
            &nbsp;
            <span>{{ item.quantityToBuy }}</span>
            &nbsp;
            <button @click="incrementQuantity(item)">+</button>
            &nbsp;            &nbsp;

            <button class="removebtn" @click="removeItem(item)">Remove</button>
          </div>
        </div>
      </div>
      <div class="placebtn" >
        <v-btn
        class="placeorder"
        max-height="40"
        max-width="170"
        @click="showAddressDetails=true"
        >Place Order</v-btn
      >      </div>
    </div>

    <div v-show="showAddressDetails" class="customerdetails">
        <div class="customerhead">
            <h2>Customer Details</h2>
            <v-btn
            class="addnebtn"
            max-height="40"
            max-width="170"
            >Add New Address</v-btn
          >
        </div>
      <form @submit.prevent="selectAddress">
        <div class="nameandmobile">
            <div class="nameinput">
                <label for="fullName">Full Name</label>
                <input class="textbox" id="fullName" v-model="fullName" required />
              </div>
              <div class="nameinput">
                <label for="mobileNumber">Mobile Number</label>
                <input class="textbox" id="mobileNumber" v-model="mobileNumber" required />
              </div>
        </div>
        
        <div class="nameinput">
          <label for="address">Address</label>
          <textarea class="textarea" id="address" v-model="address" required></textarea>
        </div>
        <div class="nameinput">
          <label for="city">City/Town</label>
          <input class="textbox" id="city" v-model="city" required />
        </div>
        <div class="nameinput">
          <label for="state">State</label>
          <input class="textbox" id="state" v-model="state" required />
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
        <div class="placebtn">
            <v-btn
            type="submit"
            class="placeorder"
            max-height="40"
            max-width="170"
            >Continue</v-btn
          >
        </div>
      </form>
    </div>
    <div  v-show="showOrderSummary" class="customerdetails">
      <h2>Order Summary</h2>
      <div v-for="item in cartItems" :key="item._id" class="order-item">
        <img src="../../public/Image 23@2x.png" alt="Book Image" />
        <div>
          <h3>{{ item.product_id.bookName }}</h3>
          <p>by {{ item.product_id.author }}</p>
          <p>Rs. {{ item.product_id.discountPrice }}</p>
          <p>Quantity: {{ item.quantityToBuy }}</p>
        </div>
      </div>
      <div class="placebtn">
        <v-btn
        type="submit"
        class="placeorder"
        max-height="40"
        max-width="170"
        @click="checkout"
        >Checkout</v-btn
      >
    </div>    </div>
  </div>
  <Footer/>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useCartStore } from '../stores/CartStore'
import Header from './Header.vue';
import Footer from './Footer.vue';
export default defineComponent({
    components:{
        Header,
        Footer
    },
  setup() {
    const cartStore = useCartStore()
    const showAddressDetails = ref(false);
    const showOrderSummary = ref(false);    const fullName = ref('');
    const mobileNumber = ref('');
    const address = ref('');
    const city = ref('');
    const state = ref('');
    const type = ref('Home');

    const decrementQuantity = (item) => {
      if (item.quantityToBuy > 1) {
        item.quantityToBuy--;
      }
    }

    const incrementQuantity = (item) => {
      if (item.quantityToBuy < item.product_id.quantity) {
        item.quantityToBuy++
      }
    }

    const removeItem = (item) => {
      cartStore.cartItems = cartStore.cartItems.filter((i) => i._id !== item._id)
    }

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
      showOrderSummary.value = true;
    };
    const checkout = () => {
      console.log('Checkout with', cartStore.cartItems, cartStore.selectedAddress);
      // Implement checkout logic here
    };
   
    return {
      cartItems: cartStore.cartItems,
      showAddressDetails,
      showOrderSummary,
    fullName,
      mobileNumber,
      address,
      city,
      state,
      type,
      decrementQuantity,
      incrementQuantity,
      removeItem,
      selectAddress,
      checkout,
    }
  }
})
</script>

<style scoped>
.cart-item, .order-item {
    display: flex;
    margin-bottom: 20px;
  }
  .cart-item img, .order-item img {
    width: 100px;
    height: auto;
  }
  .cart-item div, .order-item div {
    margin-left: 20px;
  }
  form div {
    margin-bottom: 10px;
  }
  .cart{
    padding:2rem 12rem;
    padding-right:20rem;
  }
  .mycart{
    border:1px solid rgb(198, 198, 191);
    padding:20px;
  }
  .placeorder{
    background-color: rgb(99, 99, 240);
    color: white;
  }
  .placebtn{
    display:flex;
    justify-content: flex-end;
  }
  .carthead{
    display:flex;
    justify-content: space-between;
    align-items: center;
  }
  .locationselect{
    width:200px;
    height: 40px;
    background-color: whitesmoke;
  }
  .customerdetails{
    border:1px solid rgb(198, 198, 191);
    padding:20px;
    margin-top:20px;
  }
  .customerhead{
    display:flex;
    justify-content: space-between;
    align-items: center;
  }
  .addnebtn{
    background-color: bisque;
    border:red;
  }
  .nameandmobile{
    display:flex;
    gap: 100px;
  }
  .textbox{
    height: 30px;
    width:200px;
  }
  .nameinput{
    display: flex;
    flex-direction: column;
  }
  .textarea{
    width:500px;
    height:100px;
  }
  .cartbtn button{
    border-radius: 100%;
    border:0.5px white;
  }
  .removebtn{
    background-color: none;
    border-radius: 4%;
  }
</style>
