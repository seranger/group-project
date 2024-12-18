<template>
    <div class="employee-dashboard">
        <h1>Employee Dashboard</h1>

        <!-- Attendance and Performance Overview -->
        <div class="overview">
            <div class="attendance-tracker">
                <h2>Attendance</h2>
                <div class="calendar">
                    <p>Calendar view of employee attendance</p>
                    <!-- You can integrate a library like Vue Cal or Vuetify Calendar here -->
                </div>
            </div>

            <div class="performance-tracker">
                <h2>Attendance Overview</h2>
                <div class="metrics">
                    <p>Bar chart or metrics visualization here</p>
                    <!-- You can integrate a chart library like Chart.js for performance stats -->
                </div>
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
                        <td>{{ request.status }}</td>
                        <td>
                            <button v-if="request.status === 'Pending'" @click="approveLeave(request)">Approve</button>
                            <button v-if="request.status === 'Pending'" @click="denyLeave(request)">Deny</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
export default {
    name: 'EmployeeAttendance',
    data() {
        return {
            // Leave request data
            rawata:[],
            leaveRequests: [],
        };
    },
    methods: {
        async fetchData() {
            try {
                // Fetch the JSON file
                const response = await fetch("/Data/attendance.json");
                if (!response.ok) {
                    throw new Error("Error Fetching Data");
                }
                const data = await response.json();
                this.rawData = data.attendanceAndLeave;
                this.extractLeaveRequests();
            } catch (error) {
                console.error("Failed to load data:", error);
            }
        },
        extractLeaveRequests() {
            // Flatten the leave requests into a single array
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
        }
    },
    mounted() {
        this.fetchData(); // Fetch the data when the component is mounted
    }
}
</script>

<style scoped>
.employee-dashboard {
    padding: 20px;
    font-family: Arial, sans-serif;
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
    border: 1px solid #ddd;
    border-radius: 8px;
}

.leave-requests {
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
}

table {
    width: 100%;
    border-collapse: collapse;
}

th,
td {
    padding: 10px;
    text-align: left;
    border: 1px solid #ddd;
}

button {
    margin-right: 5px;
}
</style>