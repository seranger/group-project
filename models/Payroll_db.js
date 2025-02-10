import { pool } from "../config/config.js";

// Fetch all payroll records
const getAllPayroll = async () => {
    const [data] = await pool.query('SELECT * FROM payroll');
    return data;
};

// Fetch a single payroll record by payroll_ID
const getPayroll = async (payroll_ID) => {
    const [data] = await pool.query('SELECT * FROM payroll WHERE payroll_ID = ?', [payroll_ID]);
    return data;  // Return the result (if needed)
};

// Add a new payroll record
const addPayroll = async (payroll_ID, employeeID, hours_worked, leave_deductions, final_salary, performance) => {
    await pool.query(
        'INSERT INTO payroll (payroll_ID, employeeID, hours_worked, leave_deductions, final_salary, performance) VALUES (?,?,?,?,?,?)',
        [payroll_ID, employeeID, hours_worked, leave_deductions, final_salary, performance]
    );
};

// Delete a payroll record by payroll_ID
const deletePayroll = async (payroll_ID) => {
    await pool.query('DELETE FROM payroll WHERE payroll_ID = ?', [payroll_ID]);
};

// Update an existing payroll record
const updatePayroll = async (employeeID, hours_worked, leave_deductions, final_salary, performance, payroll_ID) => {
    await pool.query(
        'UPDATE payroll SET employeeID = ?, hours_worked = ?, leave_deductions = ?, final_salary = ?, performance = ? WHERE payroll_ID = ?',
        [employeeID, hours_worked, leave_deductions, final_salary, performance, payroll_ID]
    );
};

export { getAllPayroll, getPayroll, addPayroll, deletePayroll, updatePayroll };
