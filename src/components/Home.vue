<template>
    <div id="dashboard" :class="{ 'sidebar-collapsed': isSidebarCollapsed }">
        <!-- Sidebar -->
        <aside class="sidebar">
            <div class="sidebar-header">
                <span>
                    <img src="../assets/MTech.jpg" alt="" class="logo">
                     <div class="brand" v-if="!isSidebarCollapsed">MTech Solutions</div> 
                </span>
                <button class="toggle-btn" @click="toggleSidebar">
                    <box-icon 
                        :name="isSidebarCollapsed ? 'menu' : 'x'" 
                        :rotate="isSidebarCollapsed ? '0' : '90'">
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
                        :class="{ active: isActive(menu.route) }">
                        {{ menu.name }}
                    </router-link>
                </li>
            </ul>
        </aside>

        <!-- Main Content -->
        <main>
            <header>
                <div class="user-profile">
                    <img src="https://resilienteducator.com/wp-content/uploads/2012/10/educational-supervisor.jpg"
                        alt="Profile" />
                    <span>Gavano (Administrator)</span>
                </div>
                <button class="notification">🔔</button>
            </header>

            <!-- Stats Cards -->
            <section class="stats-cards">
                <div class="card">
                    <h3>Total Employees</h3>
                    <p>856 <span class="growth up">+10.0%</span></p>
                </div>
                <div class="card">
                    <h3>Job View</h3>
                    <p>3,342 <span class="growth up">+22.0%</span></p>
                </div>
                <div class="card">
                    <h3>Job Applied</h3>
                    <p>77 <span class="growth up">+12.0%</span></p>
                </div>
                <div class="card">
                    <h3>Resigned Employees</h3>
                    <p>17 <span class="growth down">-7.0%</span></p>
                </div>
            </section>

            <!-- Job Statistics -->
            <section class="job-statistics">
                <h2>Job Statistics</h2>
                <div class="chart">
                    <canvas id="jobStatsChart"></canvas>
                </div>
            </section>

            <!-- Employee Status -->
            <section class="employee-status">
                <h2>Employee Data</h2>
                <div class="table-container">
                    <table v-if="employeeInformation.length > 0">
                        <thead>
                            <tr>
                                <th>Employee ID</th>
                                <th>Name</th>
                                <th>Position</th>
                                <th>Department</th>
                                <th>Salary</th>
                                <th>History</th>
                                <th>Contact</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="employee in employeeInformation" :key="employee.employeeId">
                                <td>{{ employee.employeeId }}</td>
                                <td>{{ employee.name }}</td>
                                <td>{{ employee.position }}</td>
                                <td>{{ employee.department }}</td>
                                <td>{{ employee.salary }}</td>
                                <td>{{ employee.employmentHistory }}</td>
                                <td>{{ employee.contact }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <!-- Employee Composition -->
            <section class="employee-composition">
                <h2>Employee Composition</h2>
                <div class="chart">
                    <canvas id="employeeCompositionChart"></canvas>
                </div>
            </section>
        </main>
    </div>
</template>

<script>

import Chart from "chart.js/auto";


export default {
    name: "HomeComp",
    data() {
        return {
            employeeInformation: [],
            isSidebarCollapsed: true,
            menus: [
                { name: "Dashboard", icon: "dashboard", route: "/HomeView" },
                { name: "Finance", icon: "money", route: "/WorkersView" },
                { name: "Employees", icon: "briefcase", route: "/" },
                { name: "Company", icon: "buildings", route: "/" },
                { name: "Calendar", icon: "calendar", route: "/" },
                { name: "Profile", icon: "user-circle", route: "/" },
                { name: "Settings", icon: "cog", route: "/" },
            ],
        };
    },
    methods: {
        toggleSidebar() {
            this.isSidebarCollapsed = !this.isSidebarCollapsed;
        },
        isActive(route) {
            return this.$route.path === route;
        }
    },
    created() {
        fetch("employee_info.json")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed!");
                }
                return response.json();
            })
            .then((data) => {
                this.employeeInformation = data;
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    },
    mounted() {
        // Job Statistics Chart
        const jobStatsData = {
            labels: ["Engineering", "Design", "Marketing", "Sales", "HR"],
            datasets: [
                {
                    label: "Jobs Posted",
                    data: [50, 30, 40, 25, 15],
                    backgroundColor: [
                        "rgba(255, 99, 132, 0.2)",
                        "rgba(54, 162, 235, 0.2)",
                        "rgba(255, 206, 86, 0.2)",
                        "rgba(75, 192, 192, 0.2)",
                        "rgba(153, 102, 255, 0.2)",
                    ],
                    borderColor: [
                        "rgba(255, 99, 132, 1)",
                        "rgba(54, 162, 235, 1)",
                        "rgba(255, 206, 86, 1)",
                        "rgba(75, 192, 192, 1)",
                        "rgba(153, 102, 255, 1)",
                    ],
                    borderWidth: 1,
                },
            ],
        };
        const jobStatsOptions = {
            responsive: true,
            plugins: {
                legend: {
                    position: "top",
                },
            },
        };
        const jobStatsCtx = document.getElementById("jobStatsChart").getContext("2d");
        new Chart(jobStatsCtx, {
            type: "bar",
            data: jobStatsData,
            options: jobStatsOptions,
        });

        // Employee Composition Pie Chart
        const employeeCompositionData = {
            labels: ["Engineering", "HR", "Design", "Marketing", "Sales"],
            datasets: [
                {
                    label: "Employee Composition",
                    data: [30, 10, 25, 20, 15],
                    backgroundColor: [
                        "rgba(255, 99, 132, 0.6)",
                        "rgba(54, 162, 235, 0.6)",
                        "rgba(255, 206, 86, 0.6)",
                        "rgba(75, 192, 192, 0.6)",
                        "rgba(153, 102, 255, 0.6)",
                    ],
                },
            ],
        };
        const employeeCompositionOptions = {
            responsive: true,
            plugins: {
                legend: {
                    position: "top",
                },
            },
        };
        const employeeCompositionCtx = document
            .getElementById("employeeCompositionChart")
            .getContext("2d");
        new Chart(employeeCompositionCtx, {
            type: "pie",
            data: employeeCompositionData,
            options: employeeCompositionOptions,
        });
    },
};
</script>

<style>
#dashboard {
    display: flex;
    background-color: #d3d3d3;
    transition: all 0.3s ease;
}

.logo{
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
    min-height: 100vh;
    transition:  0.2s ease-out;
}

.sidebar-collapsed .sidebar  {
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
    margin: 10px ;
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

.table-container {
    max-height: 300px;
    overflow-y: auto;
    border: 1px solid black;
}

table {
    width: 100%;
    border-collapse: collapse;
}

th,
td {
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid #ddd;
}

th {
    background-color: #f2f2f2;
}

main {
    flex: 1;
    padding: 20px;
}

header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.user-profile {
    display: flex;
    align-items: center;
}

.user-profile img {
    border-radius: 50%;
    margin-right: 10px;
    width: 50px;
    height: 50px;
    align-items: center;
}


.notification {
    background: none;
    border: none;
    font-size: 20px;
}

.stats-cards {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    margin-bottom: 20px;
}

.card {
    background: #fff;
    padding: 0px;
    border-radius: 5px;
    box-shadow: 0 2px 4px #0000001a;
}

.card .growth {
    font-size: 14px;
}

.card .growth.up {
    color: green;
}

.card .growth.down {
    color: red;
}

.job-statistics,
.employee-status,
.employee-composition {
    margin-bottom: 20px;
}

.chart {
    background: #f9f9f9;
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px dashed #ccc;
}

table {
    width: 100%;
    border-collapse: collapse;
}

table th,
table td {
    padding: 10px;
    border: 1px solid #ccc;
    text-align: left;
}

</style>