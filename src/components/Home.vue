<template>
  <div id="dashboard" :class="{ 'sidebar-collapsed': isSidebarCollapsed }">
    
    <main>
      <header>
        <div class="user-profile">
          <img
            src="https://ca.slack-edge.com/T02LW4RMXJQ-U07Q3KG4K0D-710193470838-512"
            alt="Profile"
          />
          <span>Sinovuyo (Administrator)</span>
        </div>
        <button class="notification">🔔</button>
      </header>

      <section class="stats-cards">
        <div class="card">
          <h3>Total Employees</h3>
          <p>250 <span class="growth up">+800%</span></p>
        </div>
        <div class="card">
          <h3>Good Perfomance</h3>
          <p>100 <span class="growth up">+40%</span></p>
        </div>
        <div class="card">
          <h3>Bad Perfomance</h3>
          <p>50 <span class="growth down">-20%</span></p>
        </div>
        <div class="card">
          <h3>Average Perfomance</h3>
          <p>100 <span class="growth up">+40%</span></p>
        </div>
      </section>

      
      <section class="job-statistics">
        <h2>Job Statistics</h2>
        <div class="chart">
          <canvas id="jobStatsChart"></canvas>
        </div>
      </section>

      
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
    };
  },
  created() {
    fetch("/Data/employee_info.json")
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

<style scoped>
#dashboard {
  display: flex;
  background-color: #d3d3d3;
  transition: all 0.3s ease;
  flex-direction: column; /* Ensure default column layout */
}

.table-container {
  max-height: 300px;
  overflow-y: auto;
  border: 3px solid black;
}

th,
td {
  padding: 8px;
  text-align: center;
}

table {
  width: 100%;
  border-collapse: collapse;
}

table th {
  padding: 10px;
  background: white;
  border: 1px solid black;
}

table td {
  padding: 10px;
  border: 1px solid black;
  background: #ddd;
  text-align: left;
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
  text-align: center;
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

/* Media Queries for Responsiveness */

@media (max-width: 1024px) {
  #dashboard {
    flex-direction: column;
  }

  .stats-cards {
    grid-template-columns: repeat(2, 1fr); /* 2 columns for tablets */
  }

  .card {
    padding: 15px;
  }

  header {
    flex-direction: column;
    align-items: flex-start;
  }

  .user-profile img {
    width: 40px;
    height: 40px;
  }

  .table-container {
    max-height: 250px;
  }

  .chart {
    height: 250px;
  }
}

@media (max-width: 768px) {
  #dashboard {
    flex-direction: column;
  }

  .stats-cards {
    grid-template-columns: 1fr; /* 1 column for smaller devices like phones */
  }

  header {
    width: 100%;
    margin-bottom: 10px;
  }

  .user-profile img {
    width: 35px;
    height: 35px;
  }

  .table-container {
    max-height: 200px;
  }

  .chart {
    height: 200px;
  }
}

@media (max-width: 480px) {
  #dashboard {
    padding: 10px;
  }

  .stats-cards {
    grid-template-columns: 1fr;
    gap: 10px;
  }

  header {
    width: 100%;
    margin-bottom: 5px;
  }

  .card {
    padding: 10px;
  }

  .user-profile img {
    width: 30px;
    height: 30px;
  }

  .chart {
    height: 150px;
  }
}
</style>
