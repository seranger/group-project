// 
import { pool } from "../config/config.js";

// Fetch all attendance records
const getAllAttendance = async () => {
    const [data] = await pool.query('SELECT * FROM attendance');
    return data;
};

// Fetch attendance records for a specific employee
const getAttendance = async (employeeID) => {
    const [data] = await pool.query('SELECT * FROM attendance WHERE employeeID = ?', [employeeID]);
    return data;  // Return the fetched data
};

// Add a new attendance record
const addAttendance = async (employeeID, date, attendance_Status) => {
    // Use VALUES instead of SET in the INSERT statement
    await pool.query(
        'INSERT INTO attendance (employeeID, date, attendance_Status) VALUES (?,?,?)',
        [employeeID, date, attendance_Status]
    );
};

// Delete an attendance record by employeeID
const deleteAttendance = async (employeeID) => {
    await pool.query('DELETE FROM attendance WHERE employeeID = ?', [employeeID]);
};

// Update an existing attendance record for a specific employee
const updateAttendance = async (date, attendance_Status, employeeID) => {
    await pool.query(
        'UPDATE attendance SET date = ?, attendance_Status = ? WHERE employeeID = ?',
        [date, attendance_Status, employeeID]
    );
};

export { getAllAttendance, getAttendance, addAttendance, deleteAttendance, updateAttendance };
