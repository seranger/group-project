import { getAllLeaveRequests, getLeaveRequest, addLeaveRequest, updateLeaveRequest, deleteLeaveRequest } from "../models/LeaveRequests_db.js";

const getAllLeaveRequestsCon = async(req,res)=>{
    res.json(await getAllLeaveRequests());
}

const getLeaveRequestCon = async(req,res)=>{
    res.json(await getLeaveRequest(req.params.leave_requestID));
}

const addLeaveRequestCon = async(req,res)=>{
    let {Leave_RequestID,employeeID,date,reason,leave_status} = req.body; 
    await addLeaveRequest(Leave_RequestID,employeeID,date,reason,leave_status);
    res.json({
    message: 'Leave Request added successfully'
    });
}

const deleteLeaveRequestCon = async(req,res)=>{
    await deleteLeaveRequest(req.params.leave_requestID);
    res.json({
    message: 'Leave Request deleted successfully'
    });
}

const updateLeaveRequestCon = async(req,res)=>{
    let {employeeID,date,reason,leave_status,leave_requestID} = req.body; 
    await updateLeaveRequest(employeeID,date,reason,leave_status,leave_requestID);
    res.json({
    message: 'Leave Request updated successfully'
    });
}

export {getAllLeaveRequestsCon,getLeaveRequestCon,addLeaveRequestCon,deleteLeaveRequestCon,updateLeaveRequestCon};