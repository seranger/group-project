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

    <!-- Success Modal -->
    <div v-if="showModal" class="modal-overlay">
      <div class="modal">
        <h2>Success</h2>
        <p>Login Successful!</p>
        <button @click="closeModal" class="modal-button">Okay</button>
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
      errorMessage: "", // To display validation errors
      showModal: false, // To control the success modal visibility
    };
  },
  methods: {
    validateLogin() {
      // Check if username and password match the criteria
      if (this.employeeId === "s" && this.password === "1") {
        this.showModal = true; // Show the success modal
        setTimeout(() => {
          // Navigate to home after a short delay
          this.$router.push("/ProfileView");
        }, 2000); // Adjust the delay as needed
      } else {
        // Set an error message for invalid credentials
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
  position: relative; /* Keeps the form in place */
}

form {
  background: #ffffff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px #0000001a;
  text-align: center;
  width: 100%;
  max-width: 400px;
  z-index: 1; /* Form stays behind the modal */
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

/* Modal Overlay Styles */
.modal-overlay {
  position: fixed; /* Ensures it covers the viewport */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
  display: flex; /* Flexbox for centering */
  align-items: center;
  justify-content: center;
  z-index: 2; /* Above the form */
}

/* Modal Styles */
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
  width: 250px; /* Smaller modal size */
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
</style>
