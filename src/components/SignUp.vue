<template>
  <div class="login-page">
    <div class="left-section">
      <div class="content-wrapper">
        <img src="/loginimage.png" alt="Online Book Shopping" class="shopping-image" />
        <h2>ONLINE BOOK SHOPPING</h2>
      </div>
    </div>
    <div class="right-section">
      <div class="form-wrapper">
        <div class="form-header">
          <v-btn-toggle v-model="isLogin" class="toggle-buttons" mandatory>
            <v-btn class="toggle-button" :class="{ active: isLogin }" @click="navigatetologin">LOGIN</v-btn>
            <v-btn class="toggle-button" :class="{ active: !isLogin }" @click="isLogin = false">SIGNUP</v-btn>
          </v-btn-toggle>
        </div>
        <v-form ref="form">
          <div v-if="!isLogin">
            <div class="u-title">Full Name</div>
            <v-text-field
              v-model="fullName"
              class="u-input"
              :rules="[(v:string) => !!v || 'Full Name is required']"
              density="compact"
              placeholder="Full Name"
              variant="outlined"
              required
            ></v-text-field>
          </div>

          <div class="u-title">Email Id</div>
          <v-text-field
            v-model="email"
            class="u-input"
            :rules="[(v:string) => !!v || 'Email is required', (v:string) => /.+@.+\..+/.test(v) || 'Email must be valid']"
            density="compact"
            placeholder="Email address"
            variant="outlined"
            required
          ></v-text-field>

          <div class="u-title-pass">Password</div>
          <v-text-field
            v-model="password"
            :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
            :type="visible ? 'text' : 'password'"
            :rules="[(v:string) => !!v || 'Password is required', (v: string | any[]) => v.length >= 6 || 'Password must be at least 6 characters']"
            density="compact"
            placeholder="Enter your password"
            variant="outlined"
            @click:append-inner="visible = !visible"
            required
          ></v-text-field>

          <div v-if="!isLogin" class="u-title">Mobile No.</div>
          <v-text-field
            v-if="!isLogin"
            v-model="mobileNo"
            class="u-input"
            :rules="[(v:string) => !!v || 'Mobile number is required', (v: string) => /^\d+$/.test(v) || 'Mobile number must be valid']"
            density="compact"
            placeholder="Mobile Number"
            variant="outlined"
            required
          ></v-text-field>

          <div>
            <v-btn
              @click="validateAndSubmit"
              class="u-btn"
              color="#A03037"
              size="large"
              variant="elevated"
              block
            >
              {{ isLogin ? 'Login' : 'Signup' }}
            </v-btn>
          </div>
        </v-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import UserService from '../Services/User.service';

export default defineComponent({
  name: 'LoginPage',

  data() {
    return {
      isLogin: false,
      fullName: '',
      email: '',
      password: '',
      mobileNo: '',
      visible: false
    };
  },

  methods: {
    async handleSubmit() {
      const userCredentials = {
        email: this.email,
        password: this.password,
        fullName: this.fullName,
        phone: this.mobileNo
      };

      try {
        if (!this.isLogin) {
          const response = await UserService.signupUser(userCredentials);
          console.log('Signup success:', response);
          this.$router.push({ name: 'login' });
        } else {
          console.log('Login success:', userCredentials);
        }
      } catch (error:any) {
        console.error('Error:', error.response ? error.response.data : error.message);
      }
    },
    navigatetologin() {
      this.$router.push({ name: 'login' });
    },

    validateAndSubmit() {
      const form = this.$refs.form as { validate: () => Promise<boolean> }; 
      form.validate().then((success) => {
        if (success) {
          this.handleSubmit();
        }
      });
    }
  }
});
</script>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html,
body {
  height: 100%;
  width: 100%;
  overflow: hidden;
}

.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
  height: 97vh;
  width:100%;
  overflow: hidden;
}

.left-section,
.right-section {
  position: relative;
  
}

.left-section .content-wrapper {
  text-align: center;
  padding: 40px;
  width:100%;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.left-section .shopping-image {
  width: 20vw;
  margin-bottom: 20px;
  border-radius: 50%;
}

.right-section {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30%;
}

.form-wrapper {
  position: absolute;
  top: 30%;
  transform: translateY(-50%);
  background-color: white;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 600px;
}

.form-header {
  display: flex;
  justify-content: space-between;
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
  text-decoration-thickness: 5px;
  color: #000000;
}

.u-title,
.u-title-pass {
  font-weight: bold;
  margin-bottom: 8px;
}


.u-forgetpass {
  display: block;
  text-align: right;
  color: #a0a0a0;
}

.or-container {
  margin: 24px 0;
  display: flex;
  justify-content: center;
  align-items: center;
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


.u-btn {
  background-color: #a03037;
  color: white;
}

.u-s-btn {
  width: 48%;
}

@media (max-width: 768px) {
  .login-page {
    flex-direction: column;
    justify-content: left;
    margin-top: 30%;
  }

  .left-section,
  .right-section {
    width: 100%;
    margin: 0;
    text-align: center;
  }

  .left-section .content-wrapper {
    margin-bottom: 20px;
  }

  .left-section .shopping-image {
    width: 40%;
    max-width: 150px;
    margin-bottom: 10px;
  }

  .right-section .form-wrapper {
    padding: 20px;
    border-radius: 0;
    box-shadow: none;
  }

  .toggle-button {
    font-size: 16px;
    padding: 10px;
  }

  .u-btn {
    font-size: 16px;
    padding: 10px;
  }
}

@media (max-width: 480px) {
  .left-section .shopping-image {
    width: 50%;
    max-width: 100px;
  }

  .toggle-button {
    font-size: 14px;
    padding: 8px;
  }

  .u-btn {
    font-size: 14px;
    padding: 8px;
  }
}
</style>(: any)(: any)(: any)(: any)(: string)(: any)(: string)(: any)(: string | any[])(: any)(: string | any[])(: any)(: string)(: any)(: string)
