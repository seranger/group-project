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
                        <tr v-for="(entry, index) in attendance" :key="index"
                            :class="entry.status === 'Present' ? 'present' : 'absent'">
                            <td>{{ entry.name }}</td>
                            <td>{{ formatDate(entry.date) }}</td>
                            <td>{{ entry.status }}</td>
                            <td>
                                <input type="checkbox" v-model="entry.status" :true-value="'Present'"
                                    :false-value="'Absent'">
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
                        <th>Status</th>  <!-- Added Status Column -->
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(request, index) in leaveRequests" :key="index">
                        <td>{{ request.name }}</td>
                        <td>{{ formatDate(request.date) }}</td>
                        <td>{{ request.reason }}</td>
                        <td :class="{
                            'pending': request.status === 'Pending',
                            'approved': request.status === 'Approved',
                            'denied': request.status === 'Denied'
                        }">
                            {{ request.status || 'Pending' }} <!-- Default to 'Pending' if no status -->
                        </td>
                        <td>
                            <button 
                                @click="openModal('approve', request)"
                                :class="['approve-btn', { 'clicked': clickedButton === 'approve' }]">Approve</button>

                            <button 
                                @click="openModal('deny', request)"
                                :class="['deny-btn', { 'clicked': clickedButton === 'deny' }]">Deny</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Modal for Confirming Action -->
        <div v-if="showModal" class="modal-overlay" @click="closeModal">
            <div class="modal-content" @click.stop>
                <h3>{{ modalAction === 'approve' ? 'Approve' : 'Deny' }} Leave Request</h3>
                <p>Status: <strong>{{ modalRequest.status || 'Pending' }}</strong></p>  <!-- Show current status -->
                <button @click="confirmAction" class="approve-btn">Confirm</button>
                <button @click="closeModal" class="deny-btn">Cancel</button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    name: 'EmployeeAttendance',
    data() {
        return {
            clickedButton: '', // To track the clicked button
            showModal: false,  // To control the modal visibility
            modalAction: '',   // Store action type ('approve' or 'deny')
            modalRequest: null // Store the current request for confirmation
        };
    },
    computed: {
        ...mapState({
            attendance: state => state.attendance || [],
            leaveRequests: state => state.leaveRequests || []
        })
    },
    methods: {
        ...mapActions([
            'getAllAttendance',
            'getAllLeaveRequests',
            'updateAttendance',
            'updateLeaveRequest'
        ]),

        formatDate(date) {
            const d = new Date(date);
            return d.toLocaleDateString('en-GB');
        },

        // Open modal with action type and request
        openModal(action, request) {
            this.modalAction = action;
            this.modalRequest = request;
            this.showModal = true;
        },

        // Close the modal
        closeModal() {
            this.showModal = false;
            this.modalAction = '';
            this.modalRequest = null;
        },

        // Confirm the action and update the leave request
        async confirmAction() {
            if (this.modalAction === 'approve') {
                await this.approveLeave(this.modalRequest);
            } else if (this.modalAction === 'deny') {
                await this.denyLeave(this.modalRequest);
            }
            this.closeModal(); // Close the modal after action
        },

        // Approve leave request
        async approveLeave(request) {
            try {
                request.status = 'Approved';
                await this.updateLeaveRequest(request);
            } catch (error) {
                console.error('Error approving leave:', error);
                alert('Failed to approve leave. Please try again.');
            }
        },

        // Deny leave request
        async denyLeave(request) {
            try {
                request.status = 'Denied';
                await this.updateLeaveRequest(request);
            } catch (error) {
                console.error('Error denying leave:', error);
                alert('Failed to deny leave. Please try again.');
            }
        },

        // Set which button was clicked
        setClickedButton(button) {
            this.clickedButton = button;
            // Optional: Reset the button after a short delay
            setTimeout(() => {
                this.clickedButton = '';
            }, 300); // Reset after 300ms
        },

        // Ensure Vuex and backend receive correct updates
        async updateAttendanceStatus(entry) {
            try {
                await this.updateAttendance({
                    id: entry.id,
                    status: entry.status,
                    date: entry.date
                });
            } catch (error) {
                console.error('Error updating attendance:', error);
                alert('Failed to update attendance. Please try again.');
            }
        }
    },

    watch: {
        attendance: {
            handler(newAttendance) {
                newAttendance.forEach(entry => {
                    if (!entry.status) entry.status = 'Present';
                });
            },
            deep: true
        }
    },

    async mounted() {
        try {
            await this.getAllAttendance();
            await this.getAllLeaveRequests();
        } catch (error) {
            console.error('Error fetching data:', error);
            alert('Failed to fetch data. Please try again.');
        }
    }
};
</script>


<style scoped>
.employee-attendance {
    padding: 20px;
    font-family: Arial, sans-serif;
    background: #ddd;
}

/* Background colors for Present and Absent */
.present {
    background-color: #d4edda; /* Green for Present */
}

.absent {
    background-color: #f8d7da; /* Red for Absent */
}

.buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 30px;
}

.approve-btn, .deny-btn {
    padding: 12px 25px;
    border: none;
    border-radius: 50px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Approve button styles */
.approve-btn {
    background-color: #4CAF50; /* Green */
    color: white;
    border: 2px solid #4CAF50;
}

/* Deny button styles */
.deny-btn {
    background-color: #f44336; /* Red */
    color: white;
    border: 2px solid #f44336;
}

/* Change color when button is clicked */
.clicked {
    opacity: 0.7;
}

/* Additional hover and active button styles */
.approve-btn:hover,
.deny-btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

.approve-btn:active,
.deny-btn:active {
    transform: translateY(0);
}

.approve-btn:focus,
.deny-btn:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1);
}

/* Overview styling */
.overview {
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
}

/* Tracker box styling */
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

/* Scrollable table styling */
.scrollable-table {
    max-height: 300px;
    overflow-y: auto;
    border: 1px solid #ddd;
}

th,
td {
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

/* Notification styling */
.notification {
    margin-top: 5px;
    font-size: 0.9em;
    color: #ffffff;
    background-color: #4CAF50;
    padding: 5px;
    border-radius: 3px;
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
    background-color: #4CAF50;
    color: white;
}

.absent {
    background-color: #FF5722;
    color: white;
}

/* Add clicked state for buttons */
.clicked {
    background-color: #3e8e41 !important; /* Darker green for approve */
    border-color: #3e8e41;
}

.clicked.deny-btn {
    background-color: #d32f2f !important; /* Darker red for deny */
    border-color: #d32f2f;
}

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    background: white;
    padding: 20px;
    border-radius: 8px;
    width: 300px;
    text-align: center;
}

.modal-content button {
    margin: 10px;
    padding: 10px 20px;
    border-radius: 5px;
}

.modal-content .approve-btn {
    background-color: #4CAF50;
    color: white;
}

.modal-content .deny-btn {
    background-color: #f44336;
    color: white;
}
/* Status colors */
.pending {
    background-color: #f0ad4e;
    color: white;
}

.approved {
    background-color: #4CAF50;
    color: white;
}

.denied {
    background-color: #d9534f;
    color: white;
}

</style>
