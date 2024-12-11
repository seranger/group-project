<template>
    <div id="dashboard">
        <!-- Sidebar -->
        <aside class="sidebar">
            <div class="brand">MTech Solutions</div>
            <ul>
                <li><a href="#" class="active">Dashboard</a></li>
                <li><a href="#">Finance</a></li>
                <li><a href="#">Employees</a></li>
                <li><a href="#">Company</a></li>
                <li><a href="#">Calendar</a></li>
                <li><a href="#">Profile</a></li>
                <li><a href="#">Setting</a></li>
            </ul>
        </aside>

        <!-- Main Content -->
        <main>
            <!-- Header -->
            <header>
                <div class="user-profile">
                    <img src="https://via.placeholder.com/40" alt="Profile" />
                    <span>Gavano (Administrator)</span>
                </div>
                <input type="text" placeholder="Search..." class="search-bar" />
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
                    <p>Bar Chart Placeholder</p>
                </div>
            </section>

            <!-- Employee Status -->
            <section class="employee-status">
                <h2>Employee Status</h2>
                <table>
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
                        <tr>
                            <td>1</td>
                            <td>Sibongile Nkosi</td>
                            <td>Software Engineer</td>
                            <td>Development</td>
                            <td>R70000</td>
                            <td>Joined in 2015, promoted to Senior in 2018</td>
                            <td>sibongile.nkosi@moderntech.com</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Lungile Moyo</td>
                            <td>HR Manager</td>
                            <td>HR</td>
                            <td>R80000</td>
                            <td>Joined in 2013, promoted to Manager in 2017</td>
                            <td>lungile.moyo@moderntech.com</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Thabo Molefe</td>
                            <td>Quality Analyst</td>
                            <td>QA</td>
                            <td>R55000</td>
                            <td>Joined in 2018</td>
                            <td>thabo.molefe@moderntech.com</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            <!-- Employee Composition -->
            <section class="employee-composition">
                <h2>Employee Composition</h2>
                <div class="chart">
                    <p>Pie Chart Placeholder</p>
                </div>
                <p>856 employee total</p>
            </section>
        </main>
    </div>
</template>

<script>
export default {
    name: "HomeComp",
};
</script>

<style>
#dashboard {
    display: flex;
}

.sidebar {
    width: 250px;
    background: #f5f5f5;
    padding: 20px;
}

.sidebar .brand {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 20px;
}

.sidebar ul {
    list-style: none;
    padding: 0;
}

.sidebar ul li {
    margin-bottom: 10px;
}

.sidebar ul li a {
    text-decoration: none;
    color: #333;
}

.sidebar ul li a.active {
    font-weight: bold;
    color: #007bff;
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
}

.search-bar {
    width: 300px;
    padding: 5px;
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
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
    height: 200px;
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