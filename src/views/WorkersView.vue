<template>
    <div>
        <h1>Employee Payroll</h1>
        <div class="grid-container">
            <div class="grid-item" v-for="employee in combinedData" :key="employee.employeeId">
                <div class="card">
                    <div class="card-body">
                        <h3 class="card-title">{{ employee.name }}</h3>
                        <p class="card-text">Employee ID: {{ employee.employeeId }}</p>
                        <p>Hours-Working: {{ employee.hoursWorked }}</p>
                        <p>Leave-Deduction: {{ employee.leaveDeductions }}%</p>
                        <p>Department: {{ employee.department }}</p>
                        <button class="btn btn-primary" @click="showPayslip(employee)">
                            Produce Payslip
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal -->
        <div class="modal" tabindex="-1" v-show="selectedEmployee">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title"><strong>Payslip: {{ selectedEmployee.name }}</strong></h1>
                        <button type="button" class="btn-close" @click="selectedEmployee = false"
                            aria-label="Close"></button>
                    </div>
                    <div class="card" style="width: 24rem">
                        <div class="card-body">
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item"><strong>Employee:</strong> {{ selectedEmployee.name }}</li>
                                <li class="list-group-item"><strong>Position:</strong> {{ selectedEmployee.position }}
                                </li>
                                <li class="list-group-item"><strong>Monthly Salary:</strong>
                                    R{{ selectedEmployee.finalSalary }}</li>
                                <li class="list-group-item"><strong>Annual Salary:</strong> R{{
                                    calculateAnnualSalary(selectedEmployee.hoursWorked) }}</li>
                                <li class="list-group-item"><strong>Salary After Deduction:</strong> {{
                                    salaryAfterDeduction(selectedEmployee) }}</li>
                            </ul>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-success" @click="downloadPayslip(selectedEmployee)">Download
                            Payslip</button>
                        <button class="btn btn-secondary" @click="selectedEmployee = false">Close</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import jsPDF from "jspdf";
import "jspdf-autotable";

export default {
    data() {
        return {
            selectedEmployee: false,
            payrollData: [],  // Holds the data for the employee whose payslip is shown
            employeeInformation: [],
            combinedData: [], // This will hold merged data
            hourlyRate: 300, // hourly rate for calculations
        };
    },
    created() {
        this.fetchData();
    },
    methods: {
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
            const deductionAmount = (employee.leaveDeductions / 100) * this.calculateMonthlySalary(employee.hoursWorked);
            return this.calculateMonthlySalary(employee.hoursWorked) - deductionAmount;
        },
        showPayslip(employee) {
            this.selectedEmployee = employee; // Set the selected employee for the modal
        },

        // Download payslip as PDF
    downloadPayslip(employee) {
      const doc = new jsPDF();

      // Title
      doc.text("Employee Payslip", 20, 20);

      // Table Headers and Data
      const headers = [["Description", "Amount"]];
      const data = [
        ["Name", employee.name],
        ["Position", employee.position],
        ["Monthly Salary", `R${this.calculateMonthlySalary(employee.hoursWorked)}`],
        ["Annual Salary", `R${this.calculateAnnualSalary(employee.hoursWorked)}`],
        ["Leave Deduction Percentage", `${employee.leaveDeductions}%`],
        ["Salary After Deduction", `R${this.salaryAfterDeduction(employee)}`],
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
    },
  },
  };
        
</script>

<style scoped>
h1 {
    text-align: center;

}

.card {
    /* Add shadows to create the "card" effect */
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    transition: 0.3s;
}

/* On mouse-over, add a deeper shadow */
.card:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}

/* Add some padding inside the card container */
.container {
    padding: 2px 16px;
}

.card-title {
    color: black;
}

.card {
    border: 3px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    /* Added shadow for better appearance */
}

.card-body {
    text-align: center;
    padding: 15px;
    /* Adjust padding for consistent spacing */
}

.modal {
    display: block;
    background-color: white;
}

.grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    /* Responsive columns */
    gap: 15px;
    /* Spacing between grid items */
    margin: 20px;
    /* Adds padding around the grid */
}

.grid-item {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.modal-body .table {
    width: 100%;
    /* Ensure the table spans the modal width */
    margin: 0;
    /* Remove default margin */
    border-collapse: collapse;
    /* Remove extra space between table borders */
    font-size: 1rem;
    /* Adjust font size for readability */
    text-align: left;
    /* Align text to the left */
}

.modal-body .table th {
    background-color: #F8F9FA;
    /* Light gray background for table headers */
    font-weight: bold;
    /* Make header text bold */
    padding: 10px;
    /* Add spacing inside header cells */
    text-align: center;
    /* Center align the header text */
    border: 1px solid #ddd;
    /* Add borders for header cells */
}

.modal-body .table td {
    padding: 8px 10px;
    /* Add padding to table data cells */
    border: 1px solid #ddd;
    /* Add borders for data cells */
    vertical-align: middle;
    /* Align text vertically in the middle */
}

caption {
    caption-side: top;
    text-align: left;
    margin-bottom: 10px;
    font-size: 18px;
    font-weight: bold;
    color: #333;
}

.modal-title {
    text-align: left;
}

.grid-container {
    display: grid;
    gap: 16px;
    /* Space between grid items */
    padding: 16px;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    /* Adjusts for responsive layout */
    align-items: start;
}

.grid-item {
    padding: 12px;
}

.card {
    border: 1px solid #ddd;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background-color: #f8f9fa;
    overflow: hidden;
    transition: transform 0.5s ease;
}

.card-body {
    padding: 16px;
    color: gray
}

.card-title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 8px;
}

.card:hover {
    transform: translateY(-20px);
}

.card-text {
    font-size: 14px;
    margin-bottom: 12px;
    color: #000;
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

/*   */
/* Modal Background */
.modal {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1050;
    background-color: rgba(0, 0, 0, 0.5);
    /* Dimmed background */
    transition: opacity 0.3s ease-in-out;
}

.modal-dialog {
    max-width: 800px;
    /* Adjust the modal width */
    margin: 50px auto;
    position: relative;
}

.modal-content {
    background-color: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
}

/* Modal Header */
.modal-header {
    background-color: #007BFF;
    color: white;
    padding: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.modal-title {
    margin: 0;
    font-size: 1.25rem;
}

.modal-header .btn-close {
    background: transparent;
    border: none;
    color: white;
    font-size: 1.5rem;
}

/* Modal Card Styling */
.card {
    margin: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
}

.card-body {
    padding: 20px;
}

.card-title {
    font-size: 1.5rem;
    color: #333;
}

.card-text {
    font-size: 1rem;
    color: #555;
    line-height: 1.5;
}

.list-group-item {
    border: none;
    font-size: 1rem;
    padding: 10px 15px;
    background-color: #F9F9F9;
    border-bottom: 1px solid #ddd;
}

.list-group-item:last-child {
    border-bottom: none;
}

.list-group-item strong {
    color: #007BFF;
}

/* Modal Footer */
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

.me {
    color: black;
}
</style>