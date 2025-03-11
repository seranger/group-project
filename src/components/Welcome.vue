<template>
  <div class="app-container">
    <div class="card">
      <h1 class="title">HR System</h1>
      <p class="description">Streamline HR Processes</p>
      <div class="button-group">
        <button class="btn btn-admin" @click="switchToAdmin">Administrator</button>

        <button class="btn btn-employee" @click="switchToEmployee">Employee</button>
      </div>
      <p class="footer">© 2024 HR Management System. All rights reserved.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "WelcomeComp",
  methods: {
    switchToAdmin() {
      
      this.$router.push({ path: "/admin" });
    },
    switchToEmployee() {
      
      this.$router.push({ path: "/employee" });
    },
  },
};
</script>

<style scoped>
.app-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #d3d3d3;
  padding: 1rem;
}

.card {
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

.description {
  font-size: 1rem;
  color: #666666;
  margin-bottom: 1.5rem;
}

.button-group {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
}

.btn-admin {
  background-color: #007bff;
  color: #ffffff;
}

.btn-employee {
  background-color: #28a745;
  color: #ffffff;
}

.footer {
  font-size: 0.875rem;
  color: #aaaaaa;
}

/* Media Queries for Responsiveness */

@media (max-width: 768px) {
  .title {
    font-size: 1.25rem;
  }

  .description {
    font-size: 0.9rem;
  }

  .card {
    max-width: 90%;
    padding: 1.5rem;
  }

  .btn {
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .title {
    font-size: 1rem;
  }

  .description {
    font-size: 0.8rem;
  }

  .card {
    max-width: 95%;
    padding: 1rem;
  }

  .btn {
    padding: 0.4rem 0.8rem;
    font-size: 0.8rem;
  }
}

@media (min-width: 1024px) {
  .card {
    max-width: 500px;
    padding: 2rem;
  }
}
</style>
