<template>
  <Headercomponent class="headercomponent" />

  <v-container>
    <v-breadcrumbs :items="['Home', 'Book(01)']"></v-breadcrumbs>
    <div class="main">
      <div class="d-flex ml-md-5">
        <div class="u-smbox d-flex align-center justify-center gap-20">
          <img height="55" width="45" src="../../public/Image 11@2x.png" alt="" />
        </div>
        <div class="u-smbox d-flex align-center justify-center">
          <img height="55" width="45" src="../../public/Image 23.png" alt="" />
        </div>
      </div>

      <div v-if="book">
        <div class="u-book-b">
          <div class="big-image">
            <img height="80%" width="80%" src="../../public/Image 11@2x.png" alt="" />
            <!-- <div class="u-box-out-b position-absolute d-flex align-center justify-center">
                <span><strong>OUT OF STOCK</strong></span>
              </div> -->
          </div>
        </div>
        <div class="mt-5 d-flex justify-space-between align-center w-100">
          <v-btn class="w-50" max-height="40" max-width="170" color="#A03037" @click="addToBag"
            >Add to Bag</v-btn
          >
          <v-btn
            class="w-50"
            max-height="40"
            max-width="170"
            color="#333333"
            prepend-icon="mdi-heart"
            @click="addToWishlist"
            >Wishlist</v-btn
          >
        </div>
      </div>

      <div class="pl-md-10 pl-sm-5 pl-xs-5" v-if="book">
        <div class="d-flex flex-column">
          <span style="font-size: 1.5em"
            ><strong>{{ book.bookName }}</strong></span
          ><br />
          <span class="u-smalltext-b">by {{ book.author }}</span>
          <div class="d-flex align-center">
            <div class="u-rating-b d-flex justify-center align-center">
              <span class="u-c-rating-b">4.5</span>
              <v-icon class="u-c-rating-b">mdi-star</v-icon>
            </div>
            <span class="u-smalltext-b pt-3 pl-3">({{ book.quantity }})</span>
          </div>
          <div class="d-flex align-center mb-4">
            <span style="font-size: 1.5em"
              ><strong>{{ book.discountPrice }}</strong></span
            >
            <span class="u-smalltext-b pl-3"
              ><strike>{{ book.price }}</strike></span
            >
          </div>
        </div>
        <v-divider></v-divider>
        <div class="d-flex flex-column mt-7">
          <span class="u-smalltext-b">
            <ul class="left-align">
              &#8226;Book Detail
            </ul>
          </span>
          <span class="u-sm-b pl-2 pb-10 text-justify">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </span>
        </div>
        <v-divider></v-divider>
        <div class="mt-3">
          <span class="text-h6 mb-3">Customer Feedback</span>
          <div class="mt-3">
            <v-card class="mx-auto d-flex flex-column" max-width="605" color="#F5F5F5">
              <v-card-item>
                <v-card-subtitle opacity="1" class="pl-2"> Overall Rating </v-card-subtitle>
                <v-rating color="#FFCE00" v-model="rating" density="comfortable"></v-rating>
              </v-card-item>
              <v-textarea
                max-width="560"
                class="pl-md-6 pr-sm-3"
                rows="3"
                density="compact"
                auto-grow
                placeholder="Write your review"
                variant="solo"
                v-model="review"
              ></v-textarea>
              <div class="button-container">
                <v-btn class="custom-btn" @click="submitReview">Submit</v-btn>
              </div>
            </v-card>
          </div>
        </div>
        <div class="feedback-item mt-8" v-for="(feedback, index) in visibleFeedbacks" :key="feedback.id">
          <div class="avatar-wrapper">
            <v-avatar color="#F5F5F5" class="avatar-border">
              <span class="avatar-text">{{ feedback.initials }}</span>
            </v-avatar>
          </div>
          <div class="content-wrapper">
            <span class="user-name"
              ><strong>{{ feedback.user_id.fullName }}</strong></span
            >
            <div>
              <v-rating
                disabled
                color="#FFCE00"
                v-model="feedback.rating"
                density="compact"
              ></v-rating>
            </div>
            <span class="comment-text">{{ feedback.comment }}</span>
          </div>
        </div>
        <div v-if="feedbacks.length > 6" class="button-container2">
          <v-btn class="custom-btn" @click="toggleShowAllFeedbacks">
            {{ showAllFeedbacks ? 'Hide Other Feedbacks' : 'Show All Feedbacks' }}
          </v-btn>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted,watch,computed } from 'vue'
import { useRoute } from 'vue-router'
import Headercomponent from './Header.vue'
import { useBookStore } from '../stores/bookStore'
import { getFeedback, setFeedback } from '../Services/Book.service'
interface Feedback {
  id: string
  name: string
  initials: string
  rating: number
  comment: string
}

export default defineComponent({
  components: {
    Headercomponent
  },
  name: 'BookDetailsView',
  data() {
    return {
      rating: 0,
      review: ''
    }
  },
  setup() {
    const rating = ref(0)
    const review = ref('')
    const route = useRoute()
    const bookStore = useBookStore()
    const book = ref(null)
    const feedbacks = ref<Feedback[]>([])
    const showAllFeedbacks = ref<boolean>(false);
    const getInitials = (fullName: string): string => {
      if (!fullName) return ''
      const nameArray = fullName.split(' ')
      const initials = nameArray.map((name) => name.charAt(0)).join('')
      return initials.toUpperCase()
    }
    onMounted(async () => {
      const bookId = route.params.id as string
      await bookStore.fetchBooks()
      book.value = bookStore.books.find((b) => b._id === bookId)
      if (book.value) {
        try {
          const feedbackData = await getFeedback(bookId)
          console.log(feedbackData.data.result)
          feedbacks.value = feedbackData.data.result.map((feedback: any) => ({
            ...feedback,
            initials: getInitials(feedback.user_id.fullName)
          }))
        } catch (error) {
          console.error('Error fetching feedback:', error)
        }
      }
    })

    const addToBag = () => {
      console.log('Add to Bag clicked')
    }

    const addToWishlist = () => {
      console.log('Add to Wishlist clicked')
    }

    const submitReview = async () => {
      try {
        const bookId = route.params.id as string
        const response = await setFeedback(bookId, { rating: rating.value, comment: review.value })
        console.log('Review submitted successfully:', response)
      } catch (error) {
        console.error('Error submitting review:', error)
      }
    }
    const reversedFeedbacks = ref<Feedback[]>([]);
    watch(feedbacks, (newVal) => {
      reversedFeedbacks.value = newVal.slice().reverse();
    });
    const toggleShowAllFeedbacks = () => {
      showAllFeedbacks.value = !showAllFeedbacks.value;
    };

    const visibleFeedbacks = computed(() => {
      if (showAllFeedbacks.value) {
        return reversedFeedbacks.value;
      } else {
        return reversedFeedbacks.value.slice(0, 6);
      }
    });
    return {
      rating,
      review,
      book,
      feedbacks,
      addToBag,
      addToWishlist,
      submitReview,
      reversedFeedbacks,
      toggleShowAllFeedbacks,
      visibleFeedbacks,
      showAllFeedbacks,
    }
  }
})
</script>

<style scoped>
.main {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  gap: 10px;
}
.big-image {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 413px;
  width: 361px;
}
.gap-20 {
  margin-bottom: 5px;
}
.u-sm-b {
  font-size: 0.8em;
  color: #373434;
}
.u-smalltext-b {
  font-size: 1em;
  color: #878787;
}
.u-c-rating-b {
  font-size: 1.1em;
}
.u-rating-b {
  margin-top: 5px;
  width: 55px;
  height: 25px;
  background: #388e3c;
  color: white;
}
.u-smbox {
  width: 44px;
  height: 54px;
  background: #ffe7e9 0% 0% no-repeat padding-box;
  border: 1px solid #7c1e1e;
  border-radius: 1px 1px 1px 0px;
  opacity: 1;
}
.u-book-b {
  width: 361px;
  height: 413px;
  background: #ffffff 0% 0% no-repeat padding-box;
  border: 1px solid #d1d1d1;
  border-radius: 2px;
  opacity: 1;
  margin-right: 40px;
}
.u-box-out-b {
  box-shadow: 0px 3px 6px #00000029;
  border-radius: 2px;
  opacity: 0.96;
  background: white;
  width: 178px;
  height: 37px;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 50%; /* Adjust position as needed */
  left: 50%; /* Adjust position as needed */
  transform: translate(-50%, -50%);
}
.u-c-img-b {
  width: 361px !important;
  height: 413px !important;
}
.u-flex-book {
  display: flex;
  flex-wrap: wrap;
}
.left-align {
  text-align: left;
  padding: 0;
}
.custom-btn {
  background-color: #3371b5;
  color: white;
}

.button-container {
  display: flex;
  justify-content: flex-end;
  margin-right: 20px;
  margin-bottom: 20px;
}
.button-container2{
  
  margin-top:10px;
}
.feedback-item {
  display: flex;
  align-items: center;
}

.mt-8 {
  margin-top: 2rem; /* Adjust according to your spacing scale */
}

.avatar-wrapper {
  margin-right: 16px; /* Adjust the gap as needed */
}

.content-wrapper {
  display: flex;
  flex-direction: column;
}

.avatar-text {
  font-size: 1.25rem;
  font-weight: 500;
  color: #707070;
}

.user-name {
  font-size: 1.25rem;
  font-weight: 500;
}

.comment-text {
  font-size: 0.875rem;
  color: #707070;
}

.avatar-border {
  border: 1px solid #707070;
}

@media only screen and (max-width: 600px) {
  .u-flex-book {
    flex-direction: column;
  }
}
</style>
