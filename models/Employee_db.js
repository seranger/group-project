import { pool } from "../config/config.js";

const getAllEmployees = async () => {
    let [data] = await pool.query('SELECT * FROM employees');
    return data;
}

const getEmployee = async (employeeID) => {
    await pool.query('SELECT * FROM employees WHERE employeeID = ?', [employeeID]);
}

const addEmployee = async (employeeID,name,position,salary,contact,department,employmentHistory) => {
    await pool.query(
        'INSERT INTO employees (employeeID, name, position, salary, contact, department,employment_history) VALUES (?, ?, ?, ?, ?, ?,?)',
        [employeeID, name, position, salary, contact, department,employmentHistory]
      );
       
}

const deleteEmployee = async (employeeID) => {
    await pool.query('DELETE FROM attendance WHERE employeeID = ?', [employeeID]);
    await pool.query('DELETE FROM leave_requests WHERE employeeID = ?', [employeeID]);
    await pool.query('DELETE FROM payroll WHERE employeeID = ?', [employeeID]);
    await pool.query('DELETE FROM employees WHERE employeeID = ?', [employeeID]);
}

const updateEmployee = async (name,position,salary,contact,department,employeeID, employmentHistory) => {
    await pool.query('UPDATE employees SET name = ?, position = ?, salary = ?, contact = ?, department = ?, employment_history = ? WHERE employeeID = ?', [name,position,salary,contact,department,employmentHistory,employeeID]);
}

export {getAllEmployees,getEmployee,addEmployee,deleteEmployee,updateEmployee}