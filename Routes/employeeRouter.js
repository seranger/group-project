import express from 'express';
import {getAllEmployeesCon,getEmployeeCon,addEmployeeCon,deleteEmployeeCon,updateEmployeeCon} from '../controllers/employeeController.js';



// manages paths from different file as I can't use app.get/app.post...
// can't use const app = express(); because we already initialized it in index.js
const router = express.Router();


router.get('/', getAllEmployeesCon);

router.get('/:employeeID', getEmployeeCon);

router.post('/', addEmployeeCon);

router.delete('/:employeeID', deleteEmployeeCon);

router.patch('/:employeeID', updateEmployeeCon);

// allows to be used outside of file
export default router;