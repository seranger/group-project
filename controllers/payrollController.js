import { getAllPayroll, getPayroll, addPayroll, deletePayroll, updatePayroll } from "../models/Payroll_db.js";

const getAllPayrollCon = async(req,res)=>{
    res.json(await getAllPayroll());
}

const getPayrollCon = async(req,res)=>{
    res.json(await getPayroll(req.params.employeeID));
}

const addPayrollCon = async(req,res)=>{
    let {payroll_ID,employeeID,hours_worked,leave_deductions,final_salary,performance} = req.body; 
    await addPayroll(payroll_ID,employeeID,hours_worked,leave_deductions,final_salary,performance);
    res.json({
    message: 'Payroll added successfully'
    });
}

const deletePayrollCon = async(req,res)=>{
    await deletePayroll(req.params.payroll_ID);
    res.json({
    message: 'Payroll deleted successfully'
    });
}

const updatePayrollCon = async(req,res)=>{
    let {employeeID,hours_worked,leave_deductions,final_salary,performance,payroll_ID} = req.body; 
    await updatePayroll(employeeID,hours_worked,leave_deductions,final_salary,performance,payroll_ID);
    res.json({
    message: 'Payroll updated successfully'
    });
}

export {getAllPayrollCon,getPayrollCon,addPayrollCon,deletePayrollCon,updatePayrollCon};