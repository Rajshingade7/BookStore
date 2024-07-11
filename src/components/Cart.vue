<!-- eslint-disable vue/multi-word-component-names -->
// eslint-disable-next-line vue/multi-word-component-names
<template>
  <Header class="headercomponent" :searchQuery="''" />

  <div class="cart">
    <v-breadcrumbs :items="['Home', 'My cart']"></v-breadcrumbs>

    <div class="mycart">
      <div class="carthead">
        <h2>My Cart ({{ cartItems.length }})</h2>
        <div>
            <v-icon class="custom-icon">mdi-map-marker</v-icon>

          <select class="locationselect" icon>
            <option value="Bridgelabz LLP">Bridgelabz Solutino LLP, No...</option>
          </select>
        </div>
      </div>
      <div v-for="item in cartItems" :key="item._id" class="cart-item">
        <img src="../../public/Image 11@2x.png" alt="Book Image" />
        <div>
          <span style="font-size: 1.5em"
            ><strong>{{ item.product_id.bookName }}</strong></span
          >
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
            &nbsp; &nbsp;

            <button class="removebtn" @click="removeItem(item)">Remove</button>
          </div>
        </div>
      </div>
      <div class="placebtn">
        <v-btn
          v-if="!showAddressDetails"
          class="placeorder"
          max-height="40"
          max-width="170"
          @click="showAddressDetails = true"
          >Place Order</v-btn
        >
      </div>
    </div>

    <div v-show="showAddressDetails" class="customerdetails">
      <div class="customerhead">
        <h2>Customer Details</h2>
        <v-btn class="addnebtn" max-height="40" max-width="170" variant="outlined"
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
            v-if="!showOrderSummary"
            type="submit"
            class="placeorder"
            max-height="40"
            max-width="170"
            >Continue</v-btn
          >
        </div>
      </form>
    </div>
    <div v-show="showOrderSummary" class="customerdetails">
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
        <v-btn type="submit" class="placeorder" max-height="40" max-width="170" @click="checkout"
          >Checkout</v-btn
        >
      </div>
    </div>
  </div>
  <Footer />
</template>



<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useCartStore } from '../stores/CartStore'
import Header from './Header.vue'
import Footer from './Footer.vue'
import { useRouter } from 'vue-router'
import { removeFromCart } from '../Services/Cart.service'

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

interface Address {
  fullAddress: string;
  city: string;
  state: string;
  addressType: string;
}

interface Product {
  bookName: string;
  author: string;
  discountPrice: number;
  price: number;
  quantity: number;
  // other product fields if any
}

interface CartItem {
  user_id: User | undefined
  product_id: Product;
  admin_user_id: string;
  quantityToBuy: number;
  _id: string;
  // other cart item fields if any
}

export default defineComponent({
  components: {
    // eslint-disable-next-line vue/no-reserved-component-names
    Header,
    // eslint-disable-next-line vue/no-reserved-component-names
    Footer
  },
  setup() {
    const router = useRouter()
    const cartStore = useCartStore()
    const showAddressDetails = ref(false)
    const showOrderSummary = ref(false)

    const user = computed<User | undefined>(() =>
      cartStore.cartItems.length > 0 ? (cartStore.cartItems[0] as unknown as CartItem).user_id : undefined
    )
    const addresses = computed<Address[]>(() => user.value?.address || [])
    const fullName = ref(user.value?.fullName || '')
    const mobileNumber = ref(user.value?.phone || '')
    const address = ref(addresses.value.length > 0 ? addresses.value[0].fullAddress : '')
    const city = ref(addresses.value.length > 0 ? addresses.value[0].city : '')
    const state = ref(addresses.value.length > 0 ? addresses.value[0].state : '')
    const type = ref(addresses.value.length > 0 ? addresses.value[0].addressType : 'Home')

    const decrementQuantity = (item: CartItem) => {
      if (item.quantityToBuy > 1) {
        item.quantityToBuy--
      }
    }

    const incrementQuantity = (item: CartItem) => {
      if (item.quantityToBuy < item.product_id.quantity) {
        item.quantityToBuy++
      }
    }

    const removeItem = async (item: CartItem) => {
      console.log('Remove item', item._id)
      await removeFromCart(item._id)
      await cartStore.fetchCartItems()
    }

    const selectAddress = () => {
      const selectedAddress = {
        fullName: fullName.value,
        mobileNumber: mobileNumber.value,
        address: address.value,
        city: city.value,
        state: state.value,
        type: type.value
      }
      cartStore.selectAddress(selectedAddress)
      showOrderSummary.value = true
    }

    const checkout = () => {
      console.log('Checkout with', cartStore.cartItems, cartStore.selectedAddress)
      router.push('/order-confirmation')
    }

    return {
      cartItems: computed(() => cartStore.cartItems as unknown as CartItem[]),
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
      checkout
    }
  }
})
</script>
<style scoped>
.cart-item,
.order-item {
  display: flex;
  margin-bottom: 20px;
}
.cart-item img,
.order-item img {
  width: 100px;
  height: auto;
}
.cart-item div,
.order-item div {
  margin-left: 20px;
}
form div {
  margin-bottom: 10px;
}
.cart {
  padding: 2rem 12rem;
  padding-right: 20rem;
}
.mycart {
  border: 1px solid rgb(198, 198, 191);
  padding: 20px;
  padding-left: 50px;
}
.placeorder {
  background-color: rgb(99, 99, 240);
  color: white;
}
.placebtn {
  display: flex;
  justify-content: flex-end;
}
.carthead {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.locationselect {
  width: 200px;
  height: 40px;
  background-color: whitesmoke;
}
.customerdetails {
  border: 1px solid rgb(198, 198, 191);
  padding: 20px;
  margin-top: 20px;
  padding-left: 50px;
}
.customerhead {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.addnebtn {
  color: red;
}
.nameandmobile {
  display: flex;
  gap: 100px;
}
.textbox {
  height: 40px;
  width: 200px;
}
.nameinput {
  display: flex;
  flex-direction: column;
}
.textarea {
  width: 500px;
  height: 100px;
}
.cartbtn button {
  border-radius: 100%;
  border: 0.5px white;
}
.removebtn {
  background-color: white;
  border-radius: 4%;
}
.custom-icon {
  color: red;
}
@media (max-width: 1200px) {
  .cart {
    padding: 2rem 4rem;
    padding-right: 5rem;
  }
}
@media (max-width: 768px) {
  .cart {
    padding: 1rem 2rem;
    padding-right: 2rem;
  }
  .carthead, .customerhead {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  .locationselect {
    width: 100%;
  }
  .nameandmobile {
    flex-direction: column;
    gap: 10px;
  }
  .textbox, .textarea {
    width: 100%;
  }
  .cart-item, .order-item {
    flex-direction: column;
    align-items: center;
  }
  .cart-item img, .order-item img {
    margin-bottom: 1rem;
  }
  .cart-item div, .order-item div {
    margin-left: 0;
  }
}
@media (max-width: 480px) {
  .cart {
    padding: 0.5rem 1rem;
    padding-right: 1rem;
  }
  .nameandmobile {
    gap: 5px;
  }
  .cart-item, .order-item {
    flex-direction: column;
    align-items: center;
  }
}
</style>
