<template>
    <div class="employee-attendance">
        <h1>Employee Dashboard</h1>

        <!-- Attendance and Performance Overview -->
        <div class="overview">
            <div class="attendance-tracker">
                <h2>Attendance</h2>
                <div class="scrollable-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Employee</th>
                                <th>Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr 
                                v-for="(entry, index) in attendanceEntries" 
                                :key="index"
                                :class="{'present': entry.status === 'Present', 'absent': entry.status === 'Absent'}"
                            >
                                <td>{{ entry.employeeName }}</td>
                                <td>{{ entry.date }}</td>
                                <td>{{ entry.status }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="performance-tracker">
                <h2>Attendance Overview</h2>
                <canvas id="attendanceChart"></canvas>
            </div>
        </div>

        <!-- Leave Requests Table -->
        <div class="leave-requests">
            <h2>Leave Requests</h2>
            <table>
                <thead>
                    <tr>
                        <th>Employee</th>
                        <th>Leave Dates</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(request, index) in leaveRequests" :key="index">
                        <td>{{ request.employeeName }}</td>
                        <td>{{ request.date }}</td>
                        <td>{{ request.reason }}</td>
                        <td>
                            <button 
                                v-if="request.status === 'Pending'" 
                                @click="approveLeave(request)" 
                                class="approve-btn"
                            >
                                Approve
                            </button>
                            <button 
                                v-if="request.status === 'Pending'" 
                                @click="denyLeave(request)" 
                                class="deny-btn"
                            >
                                Deny
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
// The following code was provided by ChatGPT, an AI language model by OpenAI, during a conversation.
// Import Chart.js library
import { Chart } from 'chart.js';

export default {
    name: 'EmployeeAttendance',
    data() {
        return {
            rawData: [],  // Fixed typo (rawata -> rawData)
            attendanceEntries: [],
            leaveRequests: [],
        };
    },
    methods: {
        async fetchData() {
            try {
                const response = await fetch("/Data/attendance.json");
                if (!response.ok) {
                    throw new Error("Error Fetching Data");
                }
                const data = await response.json();
                this.rawData = data.attendanceAndLeave;
                this.extractAttendanceData();
                this.extractLeaveRequests();
            } catch (error) {
                console.error("Failed to load data:", error);
            }
        },
        extractAttendanceData() {
            this.attendanceEntries = this.rawData.flatMap((employee) =>
                employee.attendance.map((record) => ({
                    employeeId: employee.employeeId,
                    employeeName: employee.name,
                    ...record
                }))
            );
            this.generateBarChart();
        },
        extractLeaveRequests() {
            this.leaveRequests = this.rawData.flatMap((employee) =>
                employee.leaveRequests.map((leave) => ({
                    employeeId: employee.employeeId,
                    employeeName: employee.name,
                    ...leave
                }))
            );
        },
        approveLeave(request) {
            request.status = "Approved";
        },
        denyLeave(request) {
            request.status = "Denied";
        },
        generateBarChart() {
            const presentCount = this.attendanceEntries.filter(entry => entry.status === 'Present').length;
            const absentCount = this.attendanceEntries.filter(entry => entry.status === 'Absent').length;

            const ctx = document.getElementById('attendanceChart').getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Present', 'Absent'],
                    datasets: [{
                        label: 'Attendance Status',
                        data: [presentCount, absentCount],
                        backgroundColor: ['#4CAF50', '#FF5722'],
                        borderColor: ['#4CAF50', '#FF5722'],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }
    },
    mounted() {
        this.fetchData();
    }
};
</script>

<style scoped>
.employee-attendance {
    padding: 20px;
    font-family: Arial, sans-serif;
    background: #ddd;
}

.overview {
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
}

.attendance-tracker,
.performance-tracker {
    width: 45%;
    padding: 20px;
    background: #ffffff;
    border: 1px solid #000000;
    border-radius: 8px;
}

.leave-requests {
    padding: 20px;
    border: 1px solid #000000;
    background: #ffffff;
    border-radius: 8px;
}

.scrollable-table {
    max-height: 300px;
    overflow-y: auto;
    border: 1px solid #ddd;
}

th, td {
    padding: 8px;
    text-align: left;
    border: 1px solid black;
}

th {
    background-color: #ddd;
}

table {
    width: 100%;
    border-collapse: collapse;
}

button {
    margin-right: 5px;
}

/* Button styling */
.approve-btn {
    background-color: #4CAF50; /* Green */
    color: #000000;
    border: none;
    border-radius: 10px;
    padding: 5px 10px;
    cursor: pointer;
}

.deny-btn {
    background-color: #FF5722; /* Red */
    color: #000000;
    border: none;
    border-radius: 10px;
    padding: 5px 10px;
    cursor: pointer;
}

/* Row highlight based on attendance status */
.present {
    background-color: #4CAF50; /* Green */
    color: white;
}

.absent {
    background-color: #FF5722; /* Red */
    color: white;
}
</style>
