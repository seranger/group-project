import express from 'express';
import {getAllAttendanceCon, getAttendanceCon, addAttendanceCon, deleteAttendanceCon, updateAttendanceCon} from '../controllers/attendanceController.js';



// manages paths from different file as I can't use app.get/app.post...
// can't use const app = express(); because we already initialized it in index.js
const router = express.Router();


router.get('/', getAllAttendanceCon);

router.get('/attendance/:employeeID', getAttendanceCon);

router.post('/', addAttendanceCon);

router.delete('/attendance/:employeeID', deleteAttendanceCon);

router.patch('/attendance/:employeeID', updateAttendanceCon);

// allows to be used outside of file
export default router;