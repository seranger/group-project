// import { pool } from "../config/config.js";

// const getAllLeaveRequests = async () => {
//     let [data] = await pool.query('SELECT * FROM leave_requests');
//     return data;
// }

// const getLeaveRequest = async (leave_RequestID) => {
//     await pool.query('SELECT * FROM leave_requests WHERE leave_RequestID = ?', [leave_RequestID]);
// }

// const addLeaveRequest = async (leave_RequestID,employeeID,date,reason,leave_status) => {
//     await pool.query('INSERT INTO leave_requests (leave_RequestID,employeeID,date,reason,leave_status) SET (?,?,?,?,?)', [leave_RequestID,employeeID,date,reason,leave_status]);
// }

// const deleteLeaveRequest = async (leave_RequestID) => {
//     await pool.query('DELETE * FROM leave_requests WHERE leave_RequestID = ?', [leave_RequestID]);
// }

// const updateLeaveRequest = async (employeeID,date,reason,leave_status,leave_RequestID) => {
//     await pool.query('UPDATE leave_requests SET employeeID = ?, date = ?, reason = ?, leave_status = ? WHERE leave_RequestID = ?', [employeeID,date,reason,leave_status,leave_RequestID]);
// }

// export {getAllLeaveRequests,getLeaveRequest,addLeaveRequest,deleteLeaveRequest,updateLeaveRequest};
import { pool } from "../config/config.js";

// Fetch all leave requests
const getAllLeaveRequests = async () => {
    const [data] = await pool.query(`
        SELECT lr.*, e.name
        FROM leave_requests lr
        JOIN employees e ON lr.employeeId = e.employeeID
    `);
    return data;
};

// Fetch a specific leave request by leave_RequestID
const getLeaveRequest = async (leave_RequestID) => {
    const [data] = await pool.query('SELECT * FROM leave_requests WHERE leave_RequestID = ?', [leave_RequestID]);
    return data;
};

// Add a new leave request
const addLeaveRequest = async (leave_RequestID, employeeID, date, reason, leave_status) => {
    // Use VALUES instead of SET for INSERT statements
    await pool.query(
        'INSERT INTO leave_requests (leave_RequestID, employeeID, date, reason, leave_status) VALUES (?,?,?,?,?)',
        [leave_RequestID, employeeID, date, reason, leave_status]
    );
};

// Delete a leave request by leave_RequestID
const deleteLeaveRequest = async (leave_RequestID) => {
    // Remove '*' from DELETE statement
    await pool.query('DELETE FROM leave_requests WHERE leave_RequestID = ?', [leave_RequestID]);
};

// Update an existing leave request
const updateLeaveRequest = async (employeeID, date, reason, leave_status, leave_RequestID) => {
    await pool.query(
        'UPDATE leave_requests SET employeeID = ?, date = ?, reason = ?, leave_status = ? WHERE leave_RequestID = ?',
        [employeeID, date, reason, leave_status, leave_RequestID]
    );
};

export { getAllLeaveRequests, getLeaveRequest, addLeaveRequest, deleteLeaveRequest, updateLeaveRequest };
