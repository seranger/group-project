import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import employeeRouter from "./Routes/employeeRouter.js";
import attendanceRouter from "./Routes/attendanceRouter.js";
import leaveRequestsRouter from "./Routes/leaveRequestsRouter.js";
import payrollRouter from "./Routes/payrollRouter.js";
import userLoginsRouter from "./Routes/userLoginsRouter.js";

dotenv.config();

const app = express();
app.use(express.static("public"));
app.use(cors());
app.use(express.json());

app.use("/employees", employeeRouter);
app.use("/attendance", attendanceRouter);
app.use("/leaveRequests", leaveRequestsRouter);
app.use("/payroll", payrollRouter);
app.use("/userLogins", userLoginsRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});