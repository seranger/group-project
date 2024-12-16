<template>
  <!-- Conditionally render the components -->
  <Admin v-if="currentView === 'Admin'" />
  <Employee v-if="currentView === 'Employee'" />
  <WelcomeComp @switchView="changeView" />
</template>

<script>
import Admin from "@/components/Admin.vue";
import Employee from "@/components/Employee.vue";
import WelcomeComp from "./Welcome.vue";

export default {
  name: "LoginView",
  components: {
    Admin,
    Employee,
    WelcomeComp,
  },
  data() {
    return {
      currentView: null, // Keeps track of the active view
    };
  },
  methods: {
    changeView(view) {
      this.currentView = view; // Change the current view when triggered by the child
    },
  },
};
</script>

<style></style>
