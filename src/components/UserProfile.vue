<template>
  <Header></Header>
  <v-container>
    <v-breadcrumbs :items="['Home', 'Profile']"></v-breadcrumbs>
    <v-row>
      <v-col cols="12">
        <h3>Personal Details <v-btn small @click="toggleEdit">Edit</v-btn></h3>
        <v-form v-if="isEditing">
          <div class="text-subtitle-1 text-medium-emphasis">Full Name</div>
          <input class="custom-text-field" v-model="form.fullName" />
          <div class="text-subtitle-1 text-medium-emphasis">Email Id</div>

          <input class="custom-text-field" v-model="form.email" label="Email Id" />
          <div class="text-subtitle-1 text-medium-emphasis">Password</div>

          <input class="custom-text-field" v-model="form.password" label="Password" type="password" />
          <div class="text-subtitle-1 text-medium-emphasis">Mobile Number</div>

          <input class="custom-text-field" v-model="form.mobileNumber" label="Mobile Number" />
          <br>
          <v-btn @click="saveProfile">Save</v-btn>
        </v-form>
        <v-card v-else>
          <v-card-text>{{ form.fullName }}</v-card-text>
          <v-card-text>{{ form.email }}</v-card-text>
          <v-card-text>{{ form.password }}</v-card-text>
          <v-card-text>{{ form.mobileNumber }}</v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12">
        <div class="addrs">

          <h3>Address Details <v-btn small @click="toggleEditAddress">Edit</v-btn></h3>
          <v-btn class="addnebtn" max-height="40" max-width="170" variant="outlined"
          >Add New Address</v-btn
        >
        </div>
        <v-form v-if="isEditingAddress">
          <div class="text-subtitle-1 text-medium-emphasis">Address</div>
          <textarea class="custom-text-field3" v-model="form.address" />
          <div class="city-state">
            <div>
              <div class="text-subtitle-1 text-medium-emphasis">City/Town</div>
            <input class=custom-text-field2 v-model="form.city" label="City/Town" />
            </div>
            <div>
              <div class="text-subtitle-1 text-medium-emphasis">State</div>
              <input class=custom-text-field2 v-model="form.state" label="State" />
            </div>
           
          </div>
         
          <v-radio-group v-model="form.type" label="Type" >
            <div class="radio1">

            <div>
              <v-radio label="Home" value="Home" />

            </div>
            <div>
              <v-radio label="Work" value="Work" />

            </div>
            <div>
              <v-radio label="Other" value="Other" />

            </div>
          </div>

          </v-radio-group>
          <v-btn @click="saveAddress">Save</v-btn>
        </v-form>
        <v-card v-else>
          <v-card-text>{{ form.address }}</v-card-text>
          <v-card-text>{{ form.city }}</v-card-text>
          <v-card-text>{{ form.state }}</v-card-text>
          <v-card-text>{{ form.type }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <Footer></Footer>
</template>

<script>
import { ref } from 'vue'
import Header from './Header.vue'
import Footer from './Footer.vue'
export default {
  name: 'UserProfile',
  components: {
    // eslint-disable-next-line vue/no-reserved-component-names
    Header,
    // eslint-disable-next-line vue/no-reserved-component-names
    Footer
  },
  setup() {
    const isEditing = ref(false)
    const isEditingAddress = ref(false)
    const form = ref({
      fullName: 'Raj Shingade',
      email: 'rajshingade5@gmail.com',
      password: '************',
      mobileNumber: '81678954778',
      address:
        'BridgeLabz Solutions LLP, No. 42, 14th Main, 15th Cross, Sector 4, Opp to BDA complex, near Kumarakom restaurant, HSR Layout, Bangalore',
      city: 'Bengaluru',
      state: 'Karnataka',
      type: 'Work'
    })

    const toggleEdit = () => {
      isEditing.value = !isEditing.value
    }

    const toggleEditAddress = () => {
      isEditingAddress.value = !isEditingAddress.value
    }

    const saveProfile = async () => {
      try {
        await ProfileService.updateProfile({
          fullName: form.value.fullName,
          email: form.value.email,
          password: form.value.password,
          mobileNumber: form.value.mobileNumber
        })
        isEditing.value = false
      } catch (error) {
        console.error('Error updating profile:', error)
      }
    }

    const saveAddress = async () => {
      try {
        await ProfileService.updateAddress({
          address: form.value.address,
          city: form.value.city,
          state: form.value.state,
          type: form.value.type
        })
        isEditingAddress.value = false
      } catch (error) {
        console.error('Error updating address:', error)
      }
    }

    return {
      isEditing,
      isEditingAddress,
      form,
      toggleEdit,
      toggleEditAddress,
      saveProfile,
      saveAddress
    }
  }
}
</script>

<style scoped>
.v-container {
  max-width: 800px;
  margin: auto;
}


h3 {
  display: flex;
  align-items: center;
}

h3 v-btn {
  margin-left: auto;
}
.custom-text-field {
  width:70%;
  height:40px;
  margin-bottom: 20px;
  background-color: rgb(231, 236, 236);
  border: 1px solid rgb(198, 203, 203);
  border-radius: 5px;
}
.custom-text-field2 {
  width: 250px;
  height:40px;
  margin-bottom: 20px;
  background-color: rgb(231, 236, 236);
  border: 1px solid rgb(198, 203, 203);
  border-radius: 5px;
}
.custom-text-field3 {
  width:70%;
  height:90px;
  margin-bottom: 20px;
  background-color: rgb(231, 236, 236);
  border: 1px solid rgb(198, 203, 203);
  border-radius: 5px;
}
.city-state {
  display: flex;
  justify-content: space-between;
  width:70%;
}
.addnebtn {
  margin-left: auto;
  color:red;

}
.addrs {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.radio1 {
  display: flex;
  justify-content: space-between;
  width:70%;

}
</style>
