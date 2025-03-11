<template>
    <div class="container">
        <div class="main">
            <div class="profile">
                <div class="forms-container">
                    
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

                    
                    <form class="leave-form">
                        <h2>Leave Form</h2>
                        <div class="form-group">
                            <label for="leave-type">Leave Type</label>
                            <select id="leave-type" v-model="leaveType">
                                <option value="" disabled>Select leave type</option>
                                <option>Annual Leave</option>
                                <option>Sick Leave</option>
                                <option>Casual Leave</option>
                                <option>Marternity Leave</option>
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
                
                <div class="logout-container">
                    <button type="button" class="logout-btn" @click="logout">Logout</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ProfileView",
    data() {
        return {
            fullName: "",
            email: "",
            number: "",
            address: "",
            leaveType: "",
            leaveStart: "",
            leaveEnd: "",
            leaveReason: "",
            formFields: [
                { id: "full-name", label: "Full Name", type: "text", placeholder: "Full Name" },
                { id: "email", label: "Email", type: "email", placeholder: "Email" },
                { id: "phone-number", label: "Phone Number", type: "text", placeholder: "Phone Number" },
                { id: "address", label: "Address", type: "text", placeholder: "Home Address" },
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
        logout() {
            this.$router.push("/");
        },
    },
};
</script>

<style scoped>
.container {
    display: flex;
    min-height: 100vh;
    background-color: #f9f9f9;
    font-family: Arial, sans-serif;
    justify-content: center;
    align-items: center;
}


.main {
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
    gap: 20px;
    flex: 1;
    padding: 20px;
    background-color: #ddd;
    width: 100%;
    height: 100vh;
    overflow: auto;
}


.forms-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 20px;
    max-width: 1000px;
    width: 100%;
}


.profile-form,
.leave-form {
    flex: 1;
    padding: 30px;
    background: white;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    min-width: 300px;
    max-width: 450px;
    width: 100%;
}


h2 {
    margin-bottom: 20px;
    color: #333;
    text-align: center;
}


.form-group {
    margin-bottom: 15px;
}

.form-group label {
    display: block;
    margin-bottom: 8px;
    color: #333;
}

.form-group input,
.form-group select,
.form-group textarea {
    width: 100%;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 6px;
    box-sizing: border-box;
    font-size: 1rem;
}


.update-btn,
.log-request-btn {
    background-color: #007bff;
    color: white;
    padding: 12px 18px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 1.1rem;
    width: 100%;
    margin-top: 20px;
    transition: background 0.3s;
}

.update-btn:hover,
.log-request-btn:hover {
    background-color: #28a745;
}


.logout-container {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 30px;
}

.logout-btn {
    background-color: #dc3545;
    color: white;
    padding: 12px 18px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 1.1rem;
    width: 200px; 
    transition: background 0.3s;
}

.logout-btn:hover {
    background-color: #c82333;
}
</style>
