import express from 'express';
import {getAllLeaveRequestsCon,getLeaveRequestCon,addLeaveRequestCon,deleteLeaveRequestCon,updateLeaveRequestCon} from '../controllers/leaveRequestsController.js';



// manages paths from different file as I can't use app.get/app.post...
// can't use const app = express(); because we already initialized it in index.js
const router = express.Router();


router.get('/', getAllLeaveRequestsCon);

router.get('/:leave_requestID', getLeaveRequestCon);

router.post('/', addLeaveRequestCon);

router.delete('/:leave_requestID', deleteLeaveRequestCon);

router.patch('/:leave_requestID', updateLeaveRequestCon);

// allows to be used outside of file
export default router;