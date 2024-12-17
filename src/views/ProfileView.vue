<template>
    <div class="container">
        <!-- Main Content -->
        <div class="main">
            <div class="profile">
                <div class="forms-container">
                    <!-- Profile Form -->
                    <form class="profile-form">
                        <h2>Profile</h2>
                        <div class="form-group" v-for="field in formFields" :key="field.id">
                            <label :for="field.id">{{ field.label }}</label>
                            <input :type="field.type" :id="field.id" v-model="field.model"
                                :placeholder="field.placeholder" />
                        </div>
                        <button type="button" class="update-btn" @click="updateProfile">
                            Update Profile
                        </button>
                    </form>

                    <!-- Leave Form -->
                    <form class="leave-form">
                        <h2>Leave Form</h2>
                        <div class="form-group">
                            <label for="leave-type">Leave Type</label>
                            <select id="leave-type" v-model="leaveType">
                                <option value="" disabled>Select leave type</option>
                                <option>Annual Leave</option>
                                <option>Sick Leave</option>
                                <option>Casual Leave</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="leave-start">Start Date</label>
                            <input type="date" id="leave-start" v-model="leaveStart" />
                        </div>
                        <div class="form-group">
                            <label for="leave-end">End Date</label>
                            <input type="date" id="leave-end" v-model="leaveEnd" />
                        </div>
                        <div class="form-group">
                            <label for="leave-reason">Reason</label>
                            <textarea id="leave-reason" v-model="leaveReason" rows="3"
                                placeholder="Enter the reason for your leave"></textarea>
                        </div>
                        <button type="button" class="log-request-btn" @click="logLeaveRequest">
                            Log Request
                        </button>
                    </form>
                </div>

                <!-- Attendance Section -->
                <div class="attendance-section">
                    <h2>Track Attendance</h2>
                    <table class="attendance-table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Check-In</th>
                                <th>Check-Out</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="record in attendanceRecords" :key="record.date">
                                <td>{{ record.date }}</td>
                                <td>{{ record.status }}</td>
                                <td>{{ record.checkIn }}</td>
                                <td>{{ record.checkOut }}</td>
                            </tr>
                            <tr v-if="attendanceRecords.length === 0">
                                <td colspan="4" class="no-data">No attendance records available.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            userProfile: "path/to/profile/image.jpg",
            fullName: "",
            email: "",
            number: "",
            address: "",
            leaveType: "",
            leaveStart: "",
            leaveEnd: "",
            leaveReason: "",
            attendanceRecords: [
                { date: "2024-06-01", status: "Present", checkIn: "08:30 AM", checkOut: "05:00 PM" },
                { date: "2024-06-02", status: "Absent", checkIn: "-", checkOut: "-" },
                { date: "2024-06-03", status: "Present", checkIn: "08:45 AM", checkOut: "05:10 PM" },
            ],
            formFields: [
                { label: "Full Name", type: "text", placeholder: "Enter your full name"},
                { label: "Email", type: "email", placeholder: "Enter your email"},
                { label: "Phone Number", type: "text", placeholder: "Enter your phone number"},
                { label: "Address", type: "text", placeholder: "Enter your address"},
            ],
        };
    },
    methods: {
        updateProfile() {
            console.log("Profile updated:", {
                fullName: this.fullName,
                email: this.email,
                number: this.number,
                address: this.address,
            });
        },
        logLeaveRequest() {
            console.log("Leave Request Submitted:", {
                leaveType: this.leaveType,
                leaveStart: this.leaveStart,
                leaveEnd: this.leaveEnd,
                leaveReason: this.leaveReason,
            });
        },
    },
};
</script>

<style>

.container {
    display: flex;
    min-height: 100vh;
    background-color: #f9f9f9;
    font-family: Arial, sans-serif;
}


/* Main Content */
.main {
    flex: 1;
    padding: 40px;
    background-color: #ddd;
}

h2 {
    margin-bottom: 15px;
    color: #333;
}

/* Forms Container */
.forms-container {
    display: flex;
    gap: 6px;
    justify-content: space-between;
}

.profile-form,
.leave-form {
    flex: 1;
    padding: 20px;
    background: white;
    border-radius: 10px;
}

.form-group {
    margin-bottom: 15px;
}

.form-group label {
    display: block;
    margin-bottom: 5px;
    text-align: left;
}

.form-group input,
.form-group select,
.form-group textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
}

/* Buttons */
.update-btn,
.log-request-btn {
    background-color: #007bff;
    color: #fff;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
    transition: background 0.3s;
}

.update-btn:hover,
.log-request-btn:hover {
    background-color: #28a745;
}

/* Attendance Table */
.attendance-section {
    margin-top: 30px;
}

.attendance-table {
    width: 100%;
    border-collapse: collapse;
}

.attendance-table th,
.attendance-table td {
    border: 1px solid #000000;
    padding: 10px;
    background: #ffffff;
    text-align: center;
}

.attendance-table th {
    background-color: #f4f4f4;
}
</style>