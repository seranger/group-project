<template>
    <div class="employee-attendance">
        <h1>Employee Dashboard</h1>

        <!-- Attendance Tracker -->
        <div class="attendance-tracker">
            <h2>Attendance</h2>
            <div class="scrollable-table">
                <table>
                    <thead>
                        <tr>
                            <th>Employee</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Mark Attendance</th>
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
                            <td>
                                <input type="checkbox" v-model="entry.status" true-value="Present" false-value="Absent" @change="updateAttendance(entry)">
                            </td>
                        </tr>
                    </tbody>
                </table>
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
                        <th>Reason</th>
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

        <!-- Notifications Section -->
        <div class="notifications">
            <h2>Notifications</h2>
            <ul>
                <li v-for="(notification, index) in notifications" :key="index">{{ notification }}</li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'EmployeeAttendance',
    data() {
        return {
            rawData: [],
            attendanceEntries: [],
            leaveRequests: [],
            notifications: []
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
            this.notifications.push(`${request.employeeName}'s leave request approved.`);
        },
        denyLeave(request) {
            request.status = "Denied";
            this.notifications.push(`${request.employeeName}'s leave request denied.`);
        },
        updateAttendance(entry) {
            this.notifications.push(`Attendance updated for ${entry.employeeName}: ${entry.status}`);
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

.present {
    background-color: #4CAF50;
    color: white;
}

.absent {
    background-color: #FF5722;
    color: white;
}

.notifications ul {
    list-style-type: none;
    padding: 0;
}

.notifications li {
    background: #f9f9f9;
    padding: 10px;
    margin: 5px 0;
    border-radius: 5px;
    border-left: 5px solid #4CAF50;
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
