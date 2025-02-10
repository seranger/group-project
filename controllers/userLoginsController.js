import { getAllUserLogins, getSingleLogin, addLogin, deleteLogin, updateLogin } from "../models/userLogins_db.js";

const getUserLoginsCon = async (req, res) => {
    const [data] = await getAllUserLogins();
    res.json(data);
}

const getSingleUserLoginCon = async (req, res) => {
    const [data] = await getSingleLogin(req.params.employeeID);
    res.json(data);
}

const addUserLoginCon = async (req, res) => {
    const { employeeID, username, password } = req.body;
    await addLogin(employeeID, username, password);
    res.json({
        message: 'User login added successfully'
    });
}

const deleteUserLoginCon = async (req, res) => {
    await deleteLogin(req.params.employeeID);
    res.json({
        message: 'User login deleted successfully'
    });
}

const updateUserLoginCon = async (req, res) => {
    const { employeeID, username, password } = req.body;
    await updateLogin(employeeID, username, password);
    res.json({
        message: 'User login updated successfully'
    });
}

export { getUserLoginsCon, getSingleUserLoginCon, addUserLoginCon, deleteUserLoginCon, updateUserLoginCon }