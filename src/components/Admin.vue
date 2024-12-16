<template>
  <div id="login-form" class="login-container">
    <form>
      <h2 class="title">Administrator</h2>
      <div class="input-group">
        <input type="text" v-model="employeeId" placeholder="Enter username" required />
      </div>
      <div class="input-group">
        <input type="password" v-model="password" placeholder="Enter password" required />
      </div>
      <button type="submit" class="login-button">Login</button>
      <a href="#" class="forgot-password">Forgot Password?</a>
    </form>
  </div>
</template>
<script>
export default {
  name: "AdminComp",
};
</script>

<style>
.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #d3d3d3;
}

form {
  background: #ffffff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px #0000001a;
  text-align: center;
  width: 100%;
  max-width: 400px;
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
}

.login-button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
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
</style>
