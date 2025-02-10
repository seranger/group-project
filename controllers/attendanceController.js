import { getAllAttendance, getAttendance, addAttendance, deleteAttendance, updateAttendance } from "../models/Attendance_db.js";

const getAllAttendanceCon = async(req,res)=>{
    res.json(await getAllAttendance());
}

const getAttendanceCon = async(req,res)=>{
    res.json(await getAttendance(req.params.employeeID));
}

const addAttendanceCon = async(req,res)=>{
    let {employeeID,date,attendance_Status} = req.body; 
    await addAttendance(employeeID,date,attendance_Status);
    res.json({
    message: 'Attendance added successfully'
    });
}

const deleteAttendanceCon = async(req,res)=>{
    await deleteAttendance(req.params.employeeID);
    res.json({
    message: 'Attendance deleted successfully'
    });
}

const updateAttendanceCon = async(req,res)=>{
    let {date,attendance_Status,employeeID} = req.body; 
    await updateAttendance(date,attendance_Status,employeeID);
    res.json({
    message: 'Attendance updated successfully'
    });
}

export {getAllAttendanceCon,getAttendanceCon,addAttendanceCon,deleteAttendanceCon,updateAttendanceCon};