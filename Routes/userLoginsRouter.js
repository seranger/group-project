import express from 'express'
import { getSingleUserLoginCon, getUserLoginsCon, addUserLoginCon, deleteUserLoginCon, updateUserLoginCon } from "../controllers/userLoginsController.js";

// manages paths from different file as I can't use app.get/app.post... 
// can't use const app = express(); because we already initialized it in index.js
const router = express.Router();


router.get('/', getUserLoginsCon);

router.get('/:employeeID', getSingleUserLoginCon);  

router.post('/', addUserLoginCon);

router.delete('/:employeeID', deleteUserLoginCon);

router.patch('/:employeeID', updateUserLoginCon);

// allows to be used outside of file

export default router;