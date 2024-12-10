<template >
  <div id="login-form" class="login-container">
    <h2>Employee</h2>
    <form>
      <div class="input-group">
        <input type="text" v-model="employeeId" placeholder="Enter ID" required/>
      </div>
      <div class="input-group">
      <input type="password" v-model="password" placeholder="Enter password" required/>
      </div>
      <button type="submit" class="login-button">Login</button>
      <a href="#" class="forgot-password">Forgot Password?</a>
    </form>
  </div>
</template>


<script>
export default {
    
}
</script>

<style>

.login-container {
  width: 300px;
  margin: 0 auto;
  text-align: center;
  font-family: Arial, sans-serif;
}

h2 {
  margin-bottom: 20px;
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