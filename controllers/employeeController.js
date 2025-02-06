import { getAllEmployees, getEmployee, addEmployee, updateEmployee, deleteEmployee } from "../models/Employee_db.js";

const getAllEmployeesCon = async(req,res)=>{
    res.json(await getAllEmployees());
}

const getEmployeeCon = async(req,res)=>{
    res.json(await getEmployee(req.params.employeeID));
}

const addEmployeeCon = async(req,res)=>{
    let {employeeID,name,position,salary,contact,department} = req.body; 
    console.log(req.body);
    await addEmployee(employeeID,name,position,salary,contact,department)
    res.json({
    message: 'Employee added successfully'
    });
}

const deleteEmployeeCon = async(req,res)=>{
    await deleteEmployee(req.params.employeeID)
    res.json({
    message: 'Employee deleted successfully'
    });
}

const updateEmployeeCon = async(req,res)=>{
    let {name,position,salary,contact,department,employeeID} = req.body; 
    await updateEmployee(name,position,salary,contact,department,employeeID);
    res.json({
    message: 'Employee updated successfully'
    });
}

export {getAllEmployeesCon,getEmployeeCon,addEmployeeCon,deleteEmployeeCon,updateEmployeeCon};