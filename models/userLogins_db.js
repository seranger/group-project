import {pool} from '../config/config.js';

const getAllUserLogins = async () => {
    let [data] = await pool.query('SELECT * FROM user_logins');
    return data;
}

const getSingleLogin = async (employeeID) => {
    await pool.query('SELECT * FROM user_logins WHERE employeeID = ?', [employeeID]);
}

const addLogin = async (employeeID,name,password) => {
    await pool.query('INSERT INTO user_logins (employeeID,name,password) SET (?,?,?)', [employeeID,name,password]);
}

const deleteLogin = async (employeeID) => {
    await pool.query('DELETE FROM user_logins WHERE employeeID = ?', [employeeID]);
}

const updateLogin = async (employeeID,name,password) => {
    await pool.query('UPDATE user_logins SET name = ?, password = ? WHERE employeeID = ?', [name,password,employeeID]);
}

export {getAllUserLogins,getSingleLogin,addLogin,deleteLogin,updateLogin};