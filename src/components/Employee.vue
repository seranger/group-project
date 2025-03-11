<template>
  <div id="login-form" class="login-container">
    <form @submit.prevent="validateLogin">
      <h2 class="title">Employee</h2>
      <div class="input-group">
        <input 
          type="text" 
          v-model="employeeId" 
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

    
    <div v-if="showModal" class="modal-overlay">
      <div class="modal">
        <h2>Success</h2>
        <p>Login Successful!</p>
        <div class="tick-icon">&#10003;</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EmployeeComp",
  data() {
    return {
      employeeId: "",
      password: "",
      errorMessage: "", 
      showModal: false,
    };
  },
  methods: {
    validateLogin() {
      
      if (this.employeeId === "Emp010" && this.password === "Work@25") {
        this.showModal = true; 
        setTimeout(() => {
          
          this.$router.push("/profile");
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
  background-color: #28a745;
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
  box-shadow: 0 4px 8px #00000033;
  width: 250px; 
}


.tick-icon {
  font-size: 2rem;
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
  background-color: #007bff;
}

/* Media Queries for Responsiveness */

@media (max-width: 1024px) {
  form {
    max-width: 350px; /* Adjust max width for tablets */
    padding: 1.5rem;
  }

  .title {
    font-size: 1.25rem; /* Smaller title on tablets */
  }

  input {
    padding: 8px; /* Smaller input fields on tablets */
  }

  .login-button {
    padding: 12px; /* Button padding on tablets */
  }

  .forgot-password {
    font-size: 0.875rem; /* Smaller font for forgot password link */
  }
}

@media (max-width: 768px) {
  form {
    max-width: 300px; /* Adjust max width for smaller tablets/large phones */
    padding: 1.2rem;
  }

  .title {
    font-size: 1.2rem; /* Smaller title font */
  }

  input {
    padding: 8px; /* Adjust input padding */
  }

  .login-button {
    padding: 10px; /* Adjust button padding */
  }

  .forgot-password {
    font-size: 0.875rem; /* Adjust forgot password font size */
  }
}

@media (max-width: 480px) {
  form {
    max-width: 280px; /* Adjust form width for smartphones */
    padding: 1rem;
  }

  .title {
    font-size: 1.1rem; /* Even smaller title font for mobile */
  }

  input {
    padding: 8px; /* Adjust input padding for mobile */
  }

  .login-button {
    padding: 10px; /* Adjust button padding for mobile */
  }

  .forgot-password {
    font-size: 0.8rem; /* Adjust font size for small screens */
  }

  .modal {
    width: 200px; /* Adjust modal size for mobile */
  }
}

</style>
