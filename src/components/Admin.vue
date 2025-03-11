<template>
  <div id="login-form" class="login-container">
    <form @submit.prevent="validateLogin">
      <h2 class="title">Administrator</h2>
      <div class="input-group">
        <input 
          type="text" 
          v-model="Adminuser" 
          placeholder="Enter username" 
          required 
        />
      </div>
      <div class="input-group">
        <input 
          type="password" 
          v-model="password" 
          placeholder="Enter password" 
          required 
        />
      </div>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      <button type="submit" class="login-button">Login</button>
      <a href="#" class="forgot-password">Forgot Password?</a>
    </form>

    <!-- Success Modal -->
    <div v-if="showModal" class="modal-overlay">
      <div class="modal">
        <h2>Success</h2>
        <p>Login Successful!</p>
        <!-- Unicode tick symbol -->
        <div class="tick-icon">&#10003;</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminComp",
  data() {
    return {
      Adminuser: "",
      password: "",
      errorMessage: "", 
      showModal: false,
    };
  },
  methods: {
    validateLogin() {
      
      if (this.Adminuser === "Admin" && this.password === "Adm1n@23") {
        this.showModal = true;
        setTimeout(() => {
          
          this.$router.push("/Home");
        }, 2000); 
      } else {
        
        this.errorMessage = "Invalid username or password. Please try again.";
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #d3d3d3;
  position: relative; 
  padding: 1rem; /* Added padding for smaller devices */
}

form {
  background: #ffffff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px #0000001a;
  text-align: center;
  width: 100%;
  max-width: 400px;
  z-index: 1; 
}

.title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333333;
  margin-bottom: 1rem;
}

.input-group {
  margin-bottom: 15px;
}

input {
  width: 100%;
  padding: 10px;
  margin: 5px 0;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.error-message {
  color: red;
  font-size: 0.875rem;
  margin-bottom: 15px;
}

.login-button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 4px;
}

.login-button:hover {
  background-color: #0056b3;
}

.forgot-password {
  display: block;
  margin-top: 10px;
  color: #007bff;
  text-decoration: none;
}

.forgot-password:hover {
  text-decoration: underline;
}

.modal-overlay {
  position: fixed; 
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); 
  display: flex; 
  align-items: center;
  justify-content: center;
  z-index: 2; 
}

.modal {
  position: fixed;
  background: #ffffff;
  padding: 1.5rem;
  top: 50% !important;
  left: 50% !important;
  height: 150px;
  border-radius: 8px;
  text-align: center;
  transform: translate(-50%, -50%);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 250px; 
}

.tick-icon {
  font-size: 3rem;
  color: #4caf50;
  margin-top: 1rem;
}

.modal h2 {
  margin-bottom: 0.5rem;
  font-size: 1.25rem;
  color: #333;
}

.modal p {
  margin-bottom: 1rem;
  font-size: 1rem;
  color: #555;
}

.modal-button {
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.modal-button:hover {
  background-color: #218838;
}

/* Media Queries for Responsiveness */

@media (max-width: 768px) {
  .title {
    font-size: 1.25rem;
  }

  .input-group {
    margin-bottom: 12px;
  }

  form {
    max-width: 90%;
    padding: 1.5rem;
  }

  .login-button {
    font-size: 0.9rem;
    padding: 12px;
  }

  .forgot-password {
    font-size: 0.875rem;
  }
}

@media (max-width: 480px) {
  .title {
    font-size: 1.125rem;
  }

  .input-group {
    margin-bottom: 10px;
  }

  form {
    max-width: 95%;
    padding: 1rem;
  }

  .login-button {
    font-size: 0.85rem;
    padding: 10px;
  }

  .forgot-password {
    font-size: 0.8rem;
  }

  .modal {
    width: 80%;
    padding: 1rem;
  }
}

@media (min-width: 1024px) {
  .modal {
    width: 300px;
  }
}
</style>
