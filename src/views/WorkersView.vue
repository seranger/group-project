<template>
    <div>
        <h1>Employee Payroll</h1>
        <div class="search-container">
            <input type="" v-model="searchQuery" @input="searchPayroll" placeholder="Search by employeeID" class="search-input" />
        </div>
        <div>
            <button class="btn btn-primary" @click="openAddPayrollModal">Add Payroll</button>
        </div>

        <div class="table-container">
            <table class="employee-table">
                <thead>
                    <tr>
                        <th>Payroll ID</th>
                        <th>Employee ID</th>
                        <th>Hours Worked</th>
                        <th>Leave Deduction (%)</th>
                        <th>Final Salary</th>
                        <th>Performance</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="employee in filteredPayroll" :key="employee.employeeID">
                        <td>{{ employee.payroll_ID }}</td>
                        <td>{{ employee.employeeID }}</td>
                        <td>{{ employee.hours_worked }}</td>
                        <td>{{ employee.leave_deductions }}%</td>
                        <td>{{ employee.final_salary }}</td>
                        <td>{{ employee.performance }}</td>
                        <td>
                            <button class="btn btn-primary" @click="showPayslip(employee)">
                                Produce Payslip
                            </button>
                            <i @click="deletePayroll(employee.payroll_ID)" style="color:red; cursor: pointer;" class="fas fa-trash"></i>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Modal -->
        <div class="modal" tabindex="-1" v-show="selectedEmployee">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title"><strong>Payslip: {{ selectedEmployee.name }}</strong></h1>
                    </div>
                    <div class="card" style="width: 24rem">
                        <div class="card-body">
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item"><strong>Employee:</strong> {{ getEmployeeName(selectedEmployee.employeeID) }}</li>
                                <li class="list-group-item"><strong>Position:</strong> {{ getEmployeePosition(selectedEmployee.employeeID) }}</li>
                                <li class="list-group-item"><strong>Hours Worked:</strong> {{ selectedEmployee.hours_worked }}</li>
                                <li class="list-group-item"><strong>Monthly Salary:</strong> R{{
                                    selectedEmployee.final_salary }}</li>
                                <li class="list-group-item"><strong>Annual Salary:</strong> R{{
                                    calculateAnnualSalary(selectedEmployee.hours_worked) }}</li>
                                <li class="list-group-item"><strong>Salary After Deduction:</strong> R{{
                                    salaryAfterDeduction(selectedEmployee) }}</li>
                            </ul>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-success" @click="downloadPayslip(selectedEmployee)">Download
                            Payslip</button>
                        <button class="btn btn-secondary" @click="selectedEmployee = false" style="margin-left: 10px; background-color: red;">Close</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Add Payroll Modal -->
    <section class="payroll-form">
    <div v-if="showModal" class="custom-modal" @click.self="closeModal">
    <div class="modal-content">
      <h5 class="modal-title">Manage Payroll</h5>
      <form @submit.prevent="handleSubmit">
        <input v-model="dataList.payroll_ID" placeholder="Payroll ID" type="hidden" />
        <div class="input-group">
          <input v-model="dataList.employeeID" placeholder="Employee ID" :disabled="isEditing" />
        </div>
        <div class="input-group">
          <input v-model="dataList.hours_worked" placeholder="Hours Worked" required />
        </div>
        <div class="input-group">
          <input v-model="dataList.leave_deductions" placeholder="Leave Deductions" required />
        </div>
        <div class="input-group">
          <input v-model="dataList.final_salary" type="number" placeholder="Final Salary" required />
        </div>
        <div class="input-group">
          <input v-model="dataList.performance" placeholder="Performance" required />
        </div>
      </form>
      
      <div class="modal-footer">
          <button class="btn add-btn" v-if="!isEditing" @click="addPayroll">Add Payroll</button>
          <button class="btn update-btn" v-if="isEditing" @click="updatePayroll">Update Payroll</button>
          <button class="close-btn" @click="closeModal" style="margin-left: 10px; background-color: red;">Close</button>
      </div>
    </div>
  </div>
</section>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import jsPDF from "jspdf";
import "jspdf-autotable";

export default {
    name: "WorkersView",
    data() {
        return {
            selectedEmployee: false,
            payrollData: [],  // Holds the data for the employee whose payslip is shown
            employeeInformation: [],
            combinedData: [], // This will hold merged data
            hourlyRate: 300, // hourly rate for calculations
            searchQuery: "", // Search query for filtering employees
            dataList: {
                employeeID: "",
                hours_worked: "",
                leave_deductions: "",
                final_salary: "",
                performance: "",
                payroll_ID: "",
            },
            filteredPayroll: [],
            employeeData: [],
            isEditing: false,
            showModal: false,
        };
    },
    created() {
        this.fetchData();
    },
    computed: {
        ...mapState({
        payroll: state => state.payroll || [],  // This gets the payroll state from Vuex
        employees: state => state.employees || [],
        })
},
    methods: {
        ...mapActions([  // These actions map Vuex actions for managing payroll
      'getAllPayroll',
      'getSinglePayroll',
      'addPayroll',
      'updatePayroll',
      'deletePayroll',
      'getEmployees',
    ]),

    openAddPayrollModal() {
      this.showModal = true;
      document.body.classList.add("modal-open"); // Prevent scrolling
    },
    closeModal() {
      this.showModal = false;
      document.body.classList.remove("modal-open");
    },
    addPayroll() {
        if (this.dataList.employeeID && this.dataList.hours_worked && this.dataList.leave_deductions && this.dataList.final_salary && this.dataList.performance) {
            this.$store.dispatch('addPayroll', this.dataList).then(() => {
                this.getAllPayroll(); // Fetch updated data
                this.closeModal();
                this.resetForm();
            });
        }
    },
    setUpdatePayrollData(payload) {
      this.dataList = { 
        ...payload
      };
      this.isEditing = true;
      this.openAddPayrollModal();
    },
    
    editPayroll(payload) {
      this.dataList = { 
        ...payload, 
        payrollID: payload.payroll_ID, 
        employeeID: payload.employeeID 
      };
      this.isEditing = true; // Set editing mode
      this.showModal = true; // Show the modal
    },

    // Update payroll record
    uupdatePayroll() {
  this.$store.dispatch('updatePayroll', this.dataList).then(() => {
    this.getAllPayroll();  // Refresh the payroll list
    this.closeModal();
  }).catch(err => {
    console.error("Error updating payroll:", err);
  });
},


    searchPayroll() {
            const query = this.searchQuery.toLowerCase();
            this.filteredPayroll = this.payroll.filter(employee =>
                employee.employeeID.toString().includes(query) ||
                employee.payroll_ID.toString().includes(query)
            );
        },
    
        deletePayroll(id) {
      if (id) {
        this.$store.dispatch('deletePayroll', id).then(() => {
          this.filteredPayroll = this.filteredPayroll.filter(pr => pr.payroll_ID !== id);
          this.getAllPayroll();
          this.resetForm();
        });
      }
    },

        getEmployeeName(employeeId) {
            const employee = this.employees.find(employee => employee.employeeID === employeeId);
            return employee ? employee.name : '';
        },

        getEmployeePosition(employeeId) {
            const employee = this.employees.find(employee => employee.employeeID === employeeId);
            return employee ? employee.position : '';
        },
    resetForm() {
      this.payroll = {
        employeeID: "",
        payroll_ID: "",
        hours_worked: "",
        final_salary: "",
        performance: "",
      };
    },
        async fetchData() {
            try {
                // Fetch both files in parallel
                const [payrollResponse, employeeResponse] = await Promise.all([
                    fetch("/Data/payroll_data.json"),
                    fetch("/Data/employee_info.json"),
                ]);

                if (!payrollResponse.ok || !employeeResponse.ok) {
                    throw new Error("Error fetching data");
                }

                // Parse responses
                const payrollData = await payrollResponse.json();
                const employeeInfo = await employeeResponse.json();

                // Merge the two datasets based on employeeId
                this.combinedData = this.mergeData(payrollData, employeeInfo);

                console.log("Merged Data: ", this.combinedData); // Check merged data in console
            } catch (error) {
                console.error("Error loading data:", error.message);
            }
        },
        mergeData(payroll, employee) {
            // Combine data from both JSON files
            return payroll.map((payrollItem) => {
                const employeeInfo = employee.find(
                    (employee) => employee.employeeId === payrollItem.employeeId
                );
                if (!employeeInfo) {
                    console.warn(`No matching employee for ID ${payrollItem.employeeId}`);
                    return payrollItem; // Return partial data if no match is found
                }
                return { ...payrollItem, ...employeeInfo };
            });
        },
        calculateMonthlySalary(hoursWorked) {
            return this.hourlyRate * hoursWorked;
        },
        calculateAnnualSalary(hoursWorked) {
            return this.calculateMonthlySalary(hoursWorked) * 12;
        },
        salaryAfterDeduction(employee) {
            const deductionAmount = (employee.leave_deductions / 100) * this.calculateMonthlySalary(employee.hours_worked);
            return this.calculateMonthlySalary(employee.hours_worked) - deductionAmount;
        },
        showPayslip(employee) {
            this.selectedEmployee = employee; // Set the selected employee for the modal
        },
        // Download payslip as PDF
        downloadPayslip(employeeSingle) {
            const doc = new jsPDF();
            const employee = this.employees.find(emp => emp.employeeID === employeeSingle.employeeID);
            // Title
            doc.text("Employee Payslip", 20, 20);

            // Table Headers and Data
            const headers = [["Description", "Amount"]];
            const data = [
                ["Name", employee.name],
                ["Position", employee.position],
                ["Monthly Salary", `R${this.calculateMonthlySalary(employeeSingle.hours_worked)}`],
                ["Annual Salary", `R${this.calculateAnnualSalary(employeeSingle.hours_worked)}`],
                ["Leave Deduction Percentage", `${employeeSingle.leave_deductions}%`],
                ["Salary After Deduction", `R${this.salaryAfterDeduction(employeeSingle)}`],
            ];

            // Add table to PDF
            doc.autoTable({
                head: headers,
                body: data,
                startY: 30, // Adjust table position
                theme: "grid", // Optional: Use 'grid', 'striped', etc.
            });

            // Save PDF file
            doc.save(`${employee.name}-payslip.pdf`);

            console.log(employee);
        },
    },
    mounted() {
    this.getAllPayroll(); 
    this.getEmployees(); 
      setTimeout(() => {
        this.dataList.payroll_ID = this.payroll.length + 1;
        console.log(this.payroll);
        this.filteredPayroll = this.payroll;
      }, 1000);
  },
};
</script>

<style scoped>
h1 {
  text-align: center;
}

.search-container {
  margin: 20px;
  text-align: center;
}

.search-input {
  padding: 10px;
  width: 80%;
  max-width: 400px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  margin-bottom: 20px;
}

.table-container {
  margin: 20px;
  overflow-x: auto;
}

.employee-table {
  width: 100%;
  border-collapse: collapse;
  margin: 0;
}

.employee-table th, .employee-table td {
  padding: 12px;
  text-align: left;
  border: 1px solid #ddd;
}

.employee-table th {
  background-color: #f8f9fa;
  font-weight: bold;
}

.employee-table tr:nth-child(even) {
  background-color: #f2f2f2;
}

.employee-table tr:hover {
  background-color: #ddd;
}

.btn {
  font-size: 14px;
  padding: 8px 12px;
  color: #fff;
  background-color: #007BFF;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn:hover {
  background-color: #0056B3;
}

.btn-danger {
  background-color: #dc3545;
}

.btn-danger:hover {
  background-color: #c82333;
}

/* Modal Styles */
.modal {
  display: block;
  background-color: white;
}

.modal-dialog {
  max-width: 800px;
  margin: 50px auto;
}

.modal-content {
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.modal-header {
  background-color: #007BFF;
  color: white;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-footer {
  padding: 10px 20px;
  display: flex;
  justify-content: flex-end;
  background-color: #F8F9FA;
}

.modal-footer .btn-secondary {
  background-color: #007BFF;
  border-color: #007BFF;
  color: white;
  padding: 6px 12px;
  font-size: 1rem;
  border-radius: 4px;
}

/* Gap between buttons */
.employee-table td button {
  margin-right: 10px; /* Adds space between the buttons */
}

.employee-table td button:last-child {
  margin-right: 0; /* Removes margin from the last button in the row */
}

.payroll-form {
  background: #fff;
  padding: 1.5rem;
  margin-top: 1.5rem;
  border-radius: 8px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
}
.payroll-form form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.payroll-form input {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.payroll-form button {
  padding: 0.75rem;
  border: none;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  font-size: 1rem;
  border-radius: 4px;
  transition: 0.3s;
  margin-top: 0.5rem;
}
.payroll-form button:hover {
  background-color: #0056b3;
}
</style>
