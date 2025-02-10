import express from 'express';
import {getAllPayrollCon,getPayrollCon,addPayrollCon,deletePayrollCon,updatePayrollCon} from '../controllers/payrollController.js';



// manages paths from different file as I can't use app.get/app.post...
// can't use const app = express(); because we already initialized it in index.js
const router = express.Router();


router.get('/', getAllPayrollCon);

router.get('/:payroll_ID', getPayrollCon);

router.post('/', addPayrollCon);

router.delete('/:payroll_ID', deletePayrollCon);

router.patch('/:payroll_ID', updatePayrollCon);

// allows to be used outside of file
export default router;