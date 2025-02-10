import { getAllEmployees, getEmployee, addEmployee, updateEmployee, deleteEmployee } from "../models/Employee_db.js";

const getAllEmployeesCon = async(req,res)=>{
    try{
        res.json(await getAllEmployees());
    } catch(error){
        console.log(error)
    }
}

const getEmployeeCon = async(req,res)=>{
    res.json(await getEmployee(req.params.employeeID));
}

const addEmployeeCon = async(req,res)=>{
    let {employeeId,name,position,salary,contact,department,employmentHistory} = req.body; 
    try {
        await addEmployee(employeeId,name,position,salary,contact,department,employmentHistory)
        res.json({
        message: 'Employee added successfully'
        });
    
    } catch (error) {
        console.log(error)
    }
}

const deleteEmployeeCon = async(req,res)=>{
    try {
        await deleteEmployee(req.params.employeeID)
        res.json({
        message: 'Employee deleted successfully'
        });
    } catch (error) {
        console.log(error)
    }
}

const updateEmployeeCon = async(req,res)=>{
    let {name,position,salary,contact,department,employeeID,employmentHistory} = req.body; 
    console.log(req.body);
    await updateEmployee(name,position,salary,contact,department,employeeID,employmentHistory);
    res.json({
        message: 'Employee updated successfully'
    });
}

export {getAllEmployeesCon,getEmployeeCon,addEmployeeCon,deleteEmployeeCon,updateEmployeeCon};