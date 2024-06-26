<template>
  <div class="login-page">
    <div class="left-section">
      <div class="content-wrapper">
        <img src="../../loginimage.png" alt="Online Book Shopping" class="shopping-image" />
        <h2>ONLINE BOOK SHOPPING</h2>
      </div>
    </div>
    <div class="right-section">
      <div class="form-wrapper">
        <div class="form-header">
          <v-btn-toggle v-model="isLogin" class="toggle-buttons" mandatory>
            <v-btn class="toggle-button" :class="{ active: isLogin }" @click="isLogin = true">LOGIN</v-btn>
            <v-btn class="toggle-button" :class="{ active: !isLogin }" @click="isLogin = false">SIGNUP</v-btn>
          </v-btn-toggle>
        </div>
        <v-form @submit.prevent="handleSubmit">
          <div class="u-title">Email Id</div>
          <v-text-field
            v-model="email"
            class="u-input"
            density="compact"
            placeholder="Email address"
            variant="outlined"
            required
          ></v-text-field>

          <div class="u-passdiv">
            <div class="u-title-pass">Password</div>
            <v-text-field
              v-model="password"
              :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
              :type="visible ? 'text' : 'password'"
              density="compact"
              placeholder="Enter your password"
              variant="outlined"
              @click:append-inner="visible = !visible"
              required
            ></v-text-field>

            <a class="u-forgetpass" href="#" rel="noopener noreferrer" target="_blank">
              Forgot password?
            </a>
          </div>

          <div>
            <v-btn @click="handleSubmit" class="u-btn" color="#A03037" size="large" variant="elevated" block>
              {{ isLogin ? 'Login' : 'Signup' }}
            </v-btn>
          </div>

          <div class="d-flex justify-center align-center or-container">
            <div class="or-line"></div>
            <span class="or-text"><strong>OR</strong></span>
            <div class="or-line"></div>
          </div>

          <div class="social-login d-flex justify-space-between">
            <v-btn class="u-s-btn" color="#4266B2">Facebook</v-btn>
            <v-btn class="u-s-btn" color="#E4E4E4">Google</v-btn>
          </div>
        </v-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "LoginPage",
  data() {
    return {
      isLogin: true,
      email: "",
      password: "",
      visible: false,
    };
  },
  methods: {
    handleSubmit() {
      if (this.isLogin) {
        console.log("Login - Email:", this.email);
        console.log("Login - Password:", this.password);
      } else {
        console.log("Signup - Email:", this.email);
        console.log("Signup - Password:", this.password);
      }
    },
  },
});
</script>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
background-color: #f0f0f0;
  width:100vw;
  border: 1px solid black;
  
}

.left-section,
.right-section {
  position: relative;
}

.left-section .content-wrapper {
  text-align: center;
  padding: 40px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.left-section .shopping-image {
  width: 20vw;
  margin-bottom: 20px;
  border-radius: 100%;
}

.right-section {
  display: flex;
  justify-content: center;
  align-items: center;
  width:30%;
}

.right-section .form-wrapper {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: white;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  width:100%;
  height:550px;
}

.form-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
}

.toggle-buttons {
  width: 100%;
}

.toggle-button {
  width: 50%;
  font-size: 30px;
  font-weight: bold;
  
}


  .toggle-button.active {
    text-decoration: underline;
    text-decoration-color: red;
    text-decoration-thickness:5px ;  
    color:#000000;  
  }

.u-title,
.u-title-pass {
  font-weight: bold;
  margin-bottom: 8px;
}

.u-passdiv {
  margin-top: 16px;
}

.u-forgetpass {
  display: block;
  text-align: right;
  color:#a0a0a0;
}

.or-container {
  margin: 24px 0;
  display: flex;
  justify-content: center;
  align-items: center
}

.or-line {
  flex: 1;
  height: 1px;
  background-color: #e0e0e0;
}

.or-text {
  padding: 0 16px;
  color: #000000;
}

.social-login {
  margin-top: 16px;
}

.u-btn {
  background-color: #A03037;
  color: white;
}

.u-s-btn {
  width: 48%;
}
</style>
