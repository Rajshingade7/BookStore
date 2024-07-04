<template>
    <Header></Header>
    <v-container>
        <v-breadcrumbs :items="['Home', 'Profile']"></v-breadcrumbs>
        <v-row>
        <v-col cols="12">
          <h3>Personal Details <v-btn small @click="toggleEdit">Edit</v-btn></h3>
          <v-form v-if="isEditing">
            <v-text-field v-model="form.fullName" label="Full Name" />
            <v-text-field v-model="form.email" label="Email Id" />
            <v-text-field v-model="form.password" label="Password" type="password" />
            <v-text-field v-model="form.mobileNumber" label="Mobile Number" />
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
          <h3>Address Details <v-btn small @click="toggleEditAddress">Edit</v-btn></h3>
          <v-form v-if="isEditingAddress">
            <v-text-field v-model="form.address" label="Address" />
            <v-text-field v-model="form.city" label="City/Town" />
            <v-text-field v-model="form.state" label="State" />
            <v-radio-group v-model="form.type" label="Type">
              <v-radio label="Home" value="Home" />
              <v-radio label="Work" value="Work" />
              <v-radio label="Other" value="Other" />
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
  import { ref } from 'vue';
  import Header from './Header.vue';
  import Footer from './Footer.vue';
import UserService from '../Services/User.service'  
  export default {
    name: 'UserProfile',
    components: {
      Header,
      Footer,
    },
    setup() {
      const isEditing = ref(false);
      const isEditingAddress = ref(false);
      const form = ref({
        fullName: 'Poonam Yadav',
        email: 'Poonam.Yadav@bridgelabz.com',
        password: '************',
        mobileNumber: '81678954778',
        address: 'BridgeLabz Solutions LLP, No. 42, 14th Main, 15th Cross, Sector 4, Opp to BDA complex, near Kumarakom restaurant, HSR Layout, Bangalore',
        city: 'Bengaluru',
        state: 'Karnataka',
        type: 'Work',
      });
  
      const toggleEdit = () => {
        isEditing.value = !isEditing.value;
      };
  
      const toggleEditAddress = () => {
        isEditingAddress.value = !isEditingAddress.value;
      };
  
      const saveProfile = async () => {
        try {
          await ProfileService.updateProfile({
            fullName: form.value.fullName,
            email: form.value.email,
            password: form.value.password,
            mobileNumber: form.value.mobileNumber,
          });
          isEditing.value = false;
        } catch (error) {
          console.error('Error updating profile:', error);
        }
      };
  
      const saveAddress = async () => {
        try {
          await ProfileService.updateAddress({
            address: form.value.address,
            city: form.value.city,
            state: form.value.state,
            type: form.value.type,
          });
          isEditingAddress.value = false;
        } catch (error) {
          console.error('Error updating address:', error);
        }
      };
  
      return {
        isEditing,
        isEditingAddress,
        form,
        toggleEdit,
        toggleEditAddress,
        saveProfile,
        saveAddress,
      };
    },
  };
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
  </style>
  