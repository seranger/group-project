<template>
    <div>
        <h1>Employee Payroll</h1>
        <div class="grid-container">
            <div class="grid-item" v-for="employee in payrollData" :key="employee.employeeId">
                <div class="card">
                    <div class="card-body">
                        <h3 class="card-title">{{ employee.name }}</h3>
                        <p class="card-text">Employee ID: {{ employee.employeeId }}</p>
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
                        <h1 class="modal-title">
                            <strong>Payslip: {{ selectedEmployee.name }}</strong>
                        </h1>
                        <div>
                            <p>Date: 12 December 2024</p>
                        </div>
                        <button type="button" class="btn-close" @click="selectedEmployee = false"
                            aria-label="Close"></button>
                    </div>
                    <div class="card" style="width: 24rem">
                        <!-- Card Body with Title -->
                        <div class="card-body">
                            <h5 class="card-title">{{ selectedEmployee.name }}</h5>
                        </div>
                        <!-- List Group for Detailed Information -->
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">
                                <strong>Department:</strong> {{ selectedEmployee.department }}
                            </li>
                            <li class="list-group-item">
                                <strong>Position:</strong> {{ selectedEmployee.position }}
                            </li>
                            <li class="list-group-item">
                                <strong>Employee ID:</strong> {{ selectedEmployee.employeeId }}
                            </li>
                            <li class="list-group-item">
                                <strong>Hours Worked:</strong> {{ selectedEmployee.hoursWorked }}
                            </li>
                            <li class="list-group-item">
                                <strong>Leave Deductions:</strong> {{ selectedEmployee.leaveDeductions }}
                            </li>
                            <li class="list-group-item">
                                <strong>Employment History:</strong>
                                {{ selectedEmployee.employmentHistory }}
                            </li>
                            <li class="list-group-item">
                                <strong>Email:</strong> {{ selectedEmployee.contact }}
                            </li>
                            <li class="list-group-item">
                                <strong>Salary:</strong> R{{ selectedEmployee.finalSalary }}
                            </li>
                        </ul>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="selectedEmployee = false">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            selectedEmployee: false, // Holds the data for the employee whose payslip is shown
            payrollData: [
                {
                    employeeId: 1,
                    hoursWorked: 160,
                    leaveDeductions: 8,
                    finalSalary: 69500,
                    name: "Sibongile Nkosi",
                    position: "Software Engineer",
                    department: "Development",
                    employmentHistory: "Joined in 2015, promoted to Senior in 2018",
                    contact: "sibongile.nkosi@moderntech.com",
                },
                {
                    employeeId: 2,
                    hoursWorked: 150,
                    leaveDeductions: 10,
                    finalSalary: 79000,
                    name: "Lungile Moyo",
                    position: "HR Manager",
                    department: "HR",
                    salary: 80000,
                    employmentHistory: "Joined in 2013, promoted to Manager in 2017",
                    contact: "lungile.moyo@moderntech.com",
                },
                {
                    employeeId: 3,
                    hoursWorked: 170,
                    leaveDeductions: 4,
                    finalSalary: 54800,
                    name: "Thabo Molefe",
                    position: "Quality Analyst",
                    department: "QA",
                    salary: 55000,
                    employmentHistory: "Joined in 2018",
                    contact: "thabo.molefe@moderntech.com",
                },
                {
                    employeeId: 4,
                    hoursWorked: 165,
                    leaveDeductions: 6,
                    finalSalary: 59700,
                    name: "Keshav Naidoo",
                    position: "Sales Representative",
                    department: "Sales",
                    salary: 60000,
                    employmentHistory: "Joined in 2020",
                    contact: "keshav.naidoo@moderntech.com",
                },
                {
                    employeeId: 5,
                    hoursWorked: 158,
                    leaveDeductions: 5,
                    finalSalary: 57850,
                    name: "Zanele Khumalo",
                    position: "Marketing Specialist",
                    department: "Marketing",
                    salary: 58000,
                    employmentHistory: "Joined in 2019",
                    contact: "zanele.khumalo@moderntech.com",
                },
                {
                    employeeId: 6,
                    hoursWorked: 168,
                    leaveDeductions: 2,
                    finalSalary: 64800,
                    name: "Sipho Zulu",
                    position: "UI/UX Designer",
                    department: "Design",
                    salary: 65000,
                    employmentHistory: "Joined in 2016",
                    contact: "sipho.zulu@moderntech.com",
                },
                {
                    employeeId: 7,
                    hoursWorked: 175,
                    leaveDeductions: 3,
                    finalSalary: 71800,
                    name: "Naledi Moeketsi",
                    position: "DevOps Engineer",
                    department: "IT",
                    salary: 72000,
                    employmentHistory: "Joined in 2017",
                    contact: "naledi.moeketsi@moderntech.com",
                },
                {
                    employeeId: 8,
                    hoursWorked: 160,
                    leaveDeductions: 0,
                    finalSalary: 56000,
                    name: "Farai Gumbo",
                    position: "Content Strategist",
                    department: "Marketing",
                    salary: 56000,
                    employmentHistory: "Joined in 2021",
                    contact: "farai.gumbo@moderntech.com",
                },
                {
                    employeeId: 9,
                    hoursWorked: 155,
                    leaveDeductions: 5,
                    finalSalary: 61500,
                    name: "Karabo Dlamini",
                    position: "Accountant",
                    department: "Finance",
                    salary: 62000,
                    employmentHistory: "Joined in 2018",
                    contact: "karabo.dlamini@moderntech.com",
                },
                {
                    employeeId: 10,
                    hoursWorked: 162,
                    leaveDeductions: 4,
                    finalSalary: 57750,
                    name: "Fatima Patel",
                    position: "Customer Support Lead",
                    department: "Support",
                    salary: 58000,
                    employmentHistory: "Joined in 2016",
                    contact: "fatima.patel@moderntech.com",
                },
            ],
        };
    },
    methods: {
        showPayslip(employee) {
            this.selectedEmployee = employee; // Set the selected employee for the modal
        },
    },
};
</script>


<style>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
}

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