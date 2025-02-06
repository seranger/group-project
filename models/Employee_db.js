import { pool } from "../config/config.js";

const getAllEmployees = async () => {
    let [data] = await pool.query('SELECT * FROM employees');
    return data;
}

const getEmployee = async (employeeID) => {
    await pool.query('SELECT * FROM employees WHERE employeeID = ?', [employeeID]);
}

const addEmployee = async (employeeID,name,position,salary,contact,department) => {
    await pool.query('INSERT INTO employees (employeeID,name,position,salary,contact,department) SET (?,?,?,?,?,?)', [employeeID,name,position,salary,contact,department]);
}

const deleteEmployee = async (employeeID) => {
    await pool.query('DELETE FROM employees WHERE employeeID = ?', [employeeID]);
}

const updateEmployee = async (name,position,salary,contact,department,employeeID) => {
    await pool.query('UPDATE employees SET name = ?, position = ?, salary = ?, contact = ?, department = ? WHERE employeeID = ?', [name,position,salary,contact,department,employeeID]);
}

export {getAllEmployees,getEmployee,addEmployee,deleteEmployee,updateEmployee}