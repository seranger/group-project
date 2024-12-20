<template>
  <!-- The following sidebar layout code was provided by ChatGPT in response to a request for a flexible sidebar layout: -->
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
        { name: "Home", icon: "home-smile", route: "/Home" },
        { name: "Finance", icon: "money", route: "/WorkersView" },
        { name: "Employees", icon: "user-circle", route: "/RequestView" },
        { name: "Company", icon: "buildings", route: "/AboutCom" },
        { name: "Log-Out", icon: "log-out", route: "/Welcome" },
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
<style scoped>
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
  width: 2rem + 32px;
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
  display: grid;
  margin-top: 60px;
  grid-template-columns: 4rem 1fr;
  cursor: pointer;
  overflow: hidden;
  margin: 10px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.sidebar ul li:hover{
  background-color: #007bff; /* Highlight background */
  color: black; /* Highlight text color */
  border-radius: 4px;
}
.sidebar ul li.active {
  background-color: #007bff; /* Highlight background */
  color: #ffffff; /* Highlight text color */
  border-radius: 4px;
}

.sidebar ul li:hover .nav-link,
.sidebar ul li.active .nav-link {
  color: #ffffff; /* Highlight text color */
}

.sidebar ul li .nav-link {
  margin-left: 10px; /* Space between icon and text */
  text-decoration: none;
  color: inherit; /* Inherit color for hover effect */
}

.sidebar ul li:hover .nav-link,
.sidebar ul li.active .nav-link {
  color: #ffffff; /* Highlight text color */
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
  background-color: #007bff;
  color: black;
  font-weight: bold;
}

.sidebar ul li a {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: white;
}

.sidebar ul li a.active {
  font-weight: bold;
  background-color: #007bff;
}

.sidebar ul li:hover box-icon,
.sidebar ul li.active box-icon {
  color: #ffffff; /* Highlight icon color */
}
</style>
