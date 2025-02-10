<template>
  <div class="reset-container">
    <h2>Reset Username & Password</h2>
    <form @submit.prevent="resetCredentials">
      <input
        v-model="username"
        type="text"
        placeholder="Enter new username"
        required
      />
      <input
        v-model="password"
        type="password"
        placeholder="Enter new password"
        required
      />
      <input
        v-model="confirmPassword"
        type="password"
        placeholder="Confirm new password"
        required
      />
      <button type="submit">Reset</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "ResetView",
  data() {
    return {
      username: "",
      password: "",
      confirmPassword: "",
    };
  },
  methods: {
    resetCredentials() {
      if (this.password !== this.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      alert("Username and password successfully reset!");
      this.username = "";
      this.password = "";
      this.confirmPassword = "";
    },
  },
};
</script>

<style scoped>
.reset-container {
  max-width: 400px;
  margin: 2rem auto;
  padding: 1.5rem;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}
.reset-container h2 {
  margin-bottom: 1rem;
}
.reset-container form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.reset-container input {
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}
.reset-container button {
  padding: 0.75rem;
  border: none;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  font-size: 1rem;
  border-radius: 4px;
  transition: 0.3s;
}
.reset-container button:hover {
  background-color: #0056b3;
}
</style>
