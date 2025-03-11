<template>
    <div>
        <h1>Payroll</h1>
        <div class="grid-container">
            <div class="grid-item" v-for="employee in combinedData" :key="employee.employeeId">
                <div class="card">
                    <div class="card-body">
                        <h3 class="card-title">{{ employee.name }}</h3>
                        <p class="card-text">Employee ID: {{ employee.employeeId }}</p>
                        <p>Hours-Working: {{ employee.hoursWorked }}</p>
                        <p>Leave-Deduction: {{ employee.leaveDeductions }}%</p>
                        <p>Department: {{ employee.department }}</p>
                        <p>Perfomance: {{ employee.perfomance }}</p>
                        <button class="btn btn-primary" @click="showPayslip(employee)">
                            Process Payslip
                        </button>
                    </div>
                </div>
            </div>
        </div>

       
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
    name: "WorkersView",
    data() {
        return {
            selectedEmployee: false,
            payrollData: [],  
            employeeInformation: [],
            combinedData: [], 
            hourlyRate: 300, 
        };
    },
    created() {
        this.fetchData();
    },
    methods: {
        async fetchData() {
            try {
                
                const [payrollResponse, employeeResponse] = await Promise.all([
                    fetch("/Data/payroll_data.json"),
                    fetch("/Data/employee_info.json"),
                ]);

                if (!payrollResponse.ok || !employeeResponse.ok) {
                    throw new Error("Error fetching data");
                }

                
                const payrollData = await payrollResponse.json();
                const employeeInfo = await employeeResponse.json();

                
                this.combinedData = this.mergeData(payrollData, employeeInfo);

                console.log("Merged Data: ", this.combinedData); 
            } catch (error) {
                console.error("Error loading data:", error.message);
            }
        },
        mergeData(payroll, employee) {
            
            return payroll.map((payrollItem) => {
                const employeeInfo = employee.find(
                    (employee) => employee.employeeId === payrollItem.employeeId
                );
                if (!employeeInfo) {
                    console.warn(`No matching employee for ID ${payrollItem.employeeId}`);
                    return payrollItem; 
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
            this.selectedEmployee = employee; 
        },

       
    downloadPayslip(employee) {
      const doc = new jsPDF();

      
      doc.text("Employee Payslip", 20, 20);

      
      const headers = [["Description", "Amount"]];
      const data = [
        ["Name", employee.name],
        ["Position", employee.position],
        ["Monthly Salary", `R${this.calculateMonthlySalary(employee.hoursWorked)}`],
        ["Annual Salary", `R${this.calculateAnnualSalary(employee.hoursWorked)}`],
        ["Leave Deduction Percentage", `${employee.leaveDeductions}%`],
        ["Salary After Deduction", `R${this.salaryAfterDeduction(employee)}`],
      ];

      
      doc.autoTable({
        head: headers,
        body: data,
        startY: 30, 
        theme: "grid", 
      });

     
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
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    transition: 0.3s;
}

.card:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}

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
}

.card-body {
    text-align: center;
    padding: 15px;
}

.modal {
    display: block;
    background-color: white;
}

.grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 15px;
    margin: 20px;
}

.grid-item {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.modal-body .table {
    width: 100%;
    margin: 0;
    border-collapse: collapse;
    font-size: 1rem;
    text-align: left;
}

.modal-body .table th {
    background-color: #F8F9FA;
    font-weight: bold;
    padding: 10px;
    text-align: center;
    border: 1px solid #ddd;
}

.modal-body .table td {
    padding: 8px 10px;
    border: 1px solid #ddd;
    vertical-align: middle;
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
    padding: 16px;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
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
    color: gray;
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

.modal {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1050;
    background-color: rgba(0, 0, 0, 0.5);
    transition: opacity 0.3s ease-in-out;
}

.modal-dialog {
    max-width: 800px;
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

/* Media Queries for Responsiveness */
@media (max-width: 1024px) {
  .grid-container {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 10px;
  }

  .card-body {
    padding: 12px;
  }

  .card-title {
    font-size: 16px;
  }

  .btn {
    font-size: 12px;
  }
}

@media (max-width: 768px) {
  .grid-container {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 10px;
  }

  .card-title {
    font-size: 14px;
  }

  .btn {
    padding: 6px 10px;
    font-size: 12px;
  }

  .card-body {
    padding: 10px;
  }

  .modal-dialog {
    width: 90%;
    margin-top: 20px;
  }
}

@media (max-width: 480px) {
  .grid-container {
    grid-template-columns: 1fr;
    gap: 8px;
  }

  .card-body {
    padding: 8px;
  }

  .card-title {
    font-size: 12px;
  }

  .btn {
    padding: 5px 8px;
    font-size: 10px;
  }

  .modal-dialog {
    width: 95%;
    margin-top: 20px;
  }

  .modal-title {
    font-size: 1rem;
  }

  .modal-footer .btn-secondary {
    font-size: 0.875rem;
  }
}
</style>
