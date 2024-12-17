<template>
  <div class="layout-with-sidebar">
    <!-- Sidebar Navigation -->
    <div :class="{ 'sidebar-collapsed': isSidebarCollapsed }">
      <aside class="sidebar">
        <div class="sidebar-header">
          <span>
            <img src="../assets/MTech.jpg" alt="" class="logo" />
            <div class="brand" v-if="!isSidebarCollapsed">MTech Solutions</div>
          </span>
          <button class="toggle-btn" @click="toggleSidebar">
            <box-icon
              :name="isSidebarCollapsed ? 'menu' : 'x'"
              :rotate="isSidebarCollapsed ? '0' : '90'"
            >
            </box-icon>
          </button>
        </div>
        <ul>
          <li v-for="menu in menus" :key="menu.name">
            <box-icon :name="menu.icon" color="#ffffff"></box-icon>
            <router-link
              v-if="!isSidebarCollapsed"
              :to="menu.route"
              class="nav-link"
              :class="{ active: isActive(menu.route) }"
            >
              {{ menu.name }}
            </router-link>
          </li>
        </ul>
      </aside>
    </div>

    <!-- Main Content Area -->
    <main class="content">
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isSidebarCollapsed: true,
      menus: [
        { name: "Dashboard", icon: "dashboard", route: "/HomeView" },
        { name: "Finance", icon: "money", route: "/WorkersView" },
        { name: "Employees", icon: "briefcase", route: "/" },
        { name: "Company", icon: "buildings", route: "/" },
        { name: "Log-Out", icon: "log-out", route: "/" },
      ],
    };
  },
  methods: {
    toggleSidebar() {
      this.isSidebarCollapsed = !this.isSidebarCollapsed;
    },
    isActive(route) {
      return this.$route.path === route;
    },
  },
};
</script>
<style>
.layout-with-sidebar {
  display: flex;
  height: 100vh;
}

.content {
  flex-grow: 1; /* Allow the content area to take up the remaining space */
  padding: 20px;
  overflow-y: auto; /* Enable vertical scrolling if content overflows */
  background-color: #ddd;
}

.logo {
  width: 3rem;
  align-items: center;
  border-radius: 50%;
}

.sidebar .brand {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
}

.sidebar {
  display: flex;
  flex-direction: column;
  width: (2rem + 32px);
  background: #333;
  padding: 1rem;
  color: white;
  height: 100vh;
  transition: 0.3s ease-out;
}

.sidebar-collapsed .sidebar {
  width: 50px;
}

.toggle-btn {
  background: #007bff;
  border: solid 1px white;
  margin-top: 30px;
  border-radius: 4px;
  display: flex;
  padding: 10px;
  font-size: 20px;
  cursor: pointer;
}

.sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar ul li {
  margin: 10px;
  display: grid;
  grid-template-columns: 4rem 1fr;
  cursor: pointer;
  overflow: hidden;
}

.nav-link {
  text-decoration: none;
  color: white;
  padding: 10px;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
}

.icon {
  width: 4rem;
  height: 3.5rem;
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-link:hover {
  background-color: #ffce00;
  color: black;
  font-weight: bold;
}

.sidebar ul li a {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: #333;
  color: white;
}

.sidebar ul li a.active {
  font-weight: bold;
  background-color: #007bff;
}
</style>
