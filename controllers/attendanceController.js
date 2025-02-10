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

const updateAttendanceCon = async (date, attendance_Status, employeeID) => {
    try {
      // Query to update the attendance in the database
      await pool.query(
        'UPDATE attendance SET status = ?, date = ? WHERE employee_id = ?', 
        [attendance_Status, date, employeeID]  // Use parameters from request body
      );
    } catch (error) {
      console.error(error);
      throw new Error('Error updating attendance');
    }
  };

export {getAllAttendanceCon,getAttendanceCon,addAttendanceCon,deleteAttendanceCon,updateAttendanceCon};