CREATE DATABASE mts_db;

USE mts_db;

CREATE TABLE `mts_db`.`employees` (
  `employeeID` INT AUTO_INCREMENT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `position` VARCHAR(45) NOT NULL,
  `salary` INT NOT NULL,
  `contact` VARCHAR(45) NOT NULL,
  `department` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`employeeID`));
  
INSERT INTO `mts_db`.`employees` (`employeeID`, `name`, `position`, `salary`, `contact`, `department`) 
VALUES ('1', 'Sibongile Nkosi', 'Software Engineer', '70000', 'sibongile.nkosi@moderntech.com', 'Development');
INSERT INTO `mts_db`.`employees` (`employeeID`, `name`, `position`, `salary`, `contact`, `department`) 
VALUES ('2', 'Lungile Moyo', 'HR Manager', '80000', 'lungile.moyo@moderntech.com', 'HR');
INSERT INTO `mts_db`.`employees` (`employeeID`, `name`, `position`, `salary`, `contact`, `department`) 
VALUES ('3', 'Thabo Molefe', 'Quality Analyst', '55000', 'thabo.molefe@moderntech.com', 'QA');
INSERT INTO `mts_db`.`employees` (`employeeID`, `name`, `position`, `salary`, `contact`, `department`) 
VALUES ('4', 'Keshav Naidoo', 'Sales Representative', '60000', 'keshav.naidoo@moderntech.com', 'Sales');
INSERT INTO `mts_db`.`employees` (`employeeID`, `name`, `position`, `salary`, `contact`, `department`) 
VALUES ('5', 'Zanele Khumalo', 'Marketing Specialist', '58000', 'zanele.khumalo@moderntech.com', 'Marketing');
INSERT INTO `mts_db`.`employees` (`employeeID`, `name`, `position`, `salary`, `contact`, `department`) 
VALUES ('6', 'Sipho Zulu', 'UI/UX Designer', '65000', 'sipho.zulu@moderntech.com', 'Design');
INSERT INTO `mts_db`.`employees` (`employeeID`, `name`, `position`, `salary`, `contact`, `department`) 
VALUES ('7', 'Naledi Moeketsi', 'DevOps Engineer', '72000', 'naledi.moeketsi@moderntech.com', 'IT');
INSERT INTO `mts_db`.`employees` (`employeeID`, `name`, `position`, `salary`, `contact`, `department`) 
VALUES ('8', 'Farai Gumbo', 'Content Strategist', '56000', 'farai.gumbo@moderntech.com', 'Marketing');
INSERT INTO `mts_db`.`employees` (`employeeID`, `name`, `position`, `salary`, `contact`, `department`) 
VALUES ('9', 'Karabo Dlamini', 'Accountant', '62000', 'karabo.dlamini@moderntech.com', 'Finance');
INSERT INTO `mts_db`.`employees` (`employeeID`, `name`, `position`, `salary`, `contact`, `department`) 
VALUES ('10', 'Fatima Patel', 'Customer Support Lead', '58000', 'fatima.patel@moderntech.com', 'Support');

ALTER TABLE `mts_db`.`employees` 
ADD COLUMN `employment_history` LONGTEXT NOT NULL AFTER `department`;

UPDATE `mts_db`.`employees` SET `employment_history` = 'Joined in 2015, promoted to Senior in 2018' WHERE (`employeeID` = '1');
UPDATE `mts_db`.`employees` SET `employment_history` = 'Joined in 2013, promoted to Manager in 2017' WHERE (`employeeID` = '2');
UPDATE `mts_db`.`employees` SET `employment_history` = 'Joined in 2018' WHERE (`employeeID` = '3');
UPDATE `mts_db`.`employees` SET `employment_history` = 'Joined in 2020' WHERE (`employeeID` = '4');
UPDATE `mts_db`.`employees` SET `employment_history` = 'Joined in 2019' WHERE (`employeeID` = '5');
UPDATE `mts_db`.`employees` SET `employment_history` = 'Joined in 2016' WHERE (`employeeID` = '6');
UPDATE `mts_db`.`employees` SET `employment_history` = 'Joined in 2017' WHERE (`employeeID` = '7');
UPDATE `mts_db`.`employees` SET `employment_history` = 'Joined in 2021' WHERE (`employeeID` = '8');
UPDATE `mts_db`.`employees` SET `employment_history` = 'Joined in 2018' WHERE (`employeeID` = '9');
UPDATE `mts_db`.`employees` SET `employment_history` = 'Joined in 2016' WHERE (`employeeID` = '10');


CREATE TABLE `mts_db`.`attendance` (
  `employeeID` INT NOT NULL,
  `date` DATE NOT NULL,
  `attendance_Status` ENUM ('Present', 'Absent')NOT NULL,
  PRIMARY KEY (employeeID, date),
  FOREIGN KEY (employeeID) REFERENCES Employees (employeeID)
  );
  
INSERT INTO `mts_db`.`attendance` ( `employeeID`, `date`, `attendance_Status`) VALUES ('1', '2024-11-25', 'Present');
INSERT INTO `mts_db`.`attendance` ( `employeeID`, `date`, `attendance_Status`) VALUES ('1', '2024-11-26', 'Absent');
INSERT INTO `mts_db`.`attendance` ( `employeeID`, `date`, `attendance_Status`) VALUES ('1', '2024-11-27', 'Present');
INSERT INTO `mts_db`.`attendance` ( `employeeID`, `date`, `attendance_Status`) VALUES ('1', '2024-11-28', 'Present');
INSERT INTO `mts_db`.`attendance` ( `employeeID`, `date`, `attendance_Status`) VALUES ('1', '2024-11-29', 'Present');
INSERT INTO `mts_db`.`attendance` ( `employeeID`, `date`, `attendance_Status`) VALUES ('2', '2024-11-25', 'Present');
INSERT INTO `mts_db`.`attendance` ( `employeeID`, `date`, `attendance_Status`) VALUES ('2', '2024-11-26', 'Present');
INSERT INTO `mts_db`.`attendance` ( `employeeID`, `date`, `attendance_Status`) VALUES ('2', '2024-11-27', 'Absent');
INSERT INTO `mts_db`.`attendance` ( `employeeID`, `date`, `attendance_Status`) VALUES ('2', '2024-11-28', 'Present');
INSERT INTO `mts_db`.`attendance` ( `employeeID`, `date`, `attendance_Status`) VALUES ( '2', '2024-11-29', 'Present');
INSERT INTO `mts_db`.`attendance` ( `employeeID`, `date`, `attendance_Status`) VALUES ( '3', '2024-11-25', 'Present');
INSERT INTO `mts_db`.`attendance` ( `employeeID`, `date`, `attendance_Status`) VALUES ( '3', '2024-11-26', 'Present');
INSERT INTO `mts_db`.`attendance` ( `employeeID`, `date`, `attendance_Status`) VALUES ( '3', '2024-11-27', 'Present');
INSERT INTO `mts_db`.`attendance` ( `employeeID`, `date`, `attendance_Status`) VALUES ( '3', '2024-11-28', 'Absent');
INSERT INTO `mts_db`.`attendance` ( `employeeID`, `date`, `attendance_Status`) VALUES ( '3', '2024-11-29', 'Present');
INSERT INTO `mts_db`.`attendance` ( `employeeID`, `date`, `attendance_Status`) VALUES ( '4', '2024-11-25', 'Absent');
INSERT INTO `mts_db`.`attendance` ( `employeeID`, `date`, `attendance_Status`) VALUES ( '4', '2024-11-26', 'Present');
INSERT INTO `mts_db`.`attendance` ( `employeeID`, `date`, `attendance_Status`) VALUES ( '4', '2024-11-27', 'Present');
INSERT INTO `mts_db`.`attendance` ( `employeeID`, `date`, `attendance_Status`) VALUES ( '4', '2024-11-28', 'Present');
INSERT INTO `mts_db`.`attendance` ( `employeeID`, `date`, `attendance_Status`) VALUES ( '4', '2024-11-29', 'Present');
INSERT INTO `mts_db`.`attendance` ( `employeeID`, `date`, `attendance_Status`) VALUES ( '5', '2024-11-25', 'Present');
INSERT INTO `mts_db`.`attendance` ( `employeeID`, `date`, `attendance_Status`) VALUES ( '5', '2024-11-26', 'Present');
INSERT INTO `mts_db`.`attendance` ( `employeeID`, `date`, `attendance_Status`) VALUES ( '5', '2024-11-27', 'Absent');
INSERT INTO `mts_db`.`attendance` ( `employeeID`, `date`, `attendance_Status`) VALUES ( '5', '2024-11-28', 'Present');
INSERT INTO `mts_db`.`attendance` ( `employeeID`, `date`, `attendance_Status`) VALUES ( '5', '2024-11-29', 'Present');
INSERT INTO `mts_db`.`attendance` ( `employeeID`, `date`, `attendance_Status`) VALUES ( '6', '2024-11-25', 'Present');
INSERT INTO `mts_db`.`attendance` ( `employeeID`, `date`, `attendance_Status`) VALUES ( '6', '2024-11-26', 'Present');
INSERT INTO `mts_db`.`attendance` ( `employeeID`, `date`, `attendance_Status`) VALUES ( '6', '2024-11-27', 'Absent');
INSERT INTO `mts_db`.`attendance` ( `employeeID`, `date`, `attendance_Status`) VALUES ( '6', '2024-11-28', 'Present');
INSERT INTO `mts_db`.`attendance` ( `employeeID`, `date`, `attendance_Status`) VALUES ( '6', '2024-11-29', 'Present');
INSERT INTO `mts_db`.`attendance` ( `employeeID`, `date`, `attendance_Status`) VALUES ( '7', '2024-11-25', 'Present');
INSERT INTO `mts_db`.`attendance` ( `employeeID`, `date`, `attendance_Status`) VALUES ( '7', '2024-11-26', 'Present');
INSERT INTO `mts_db`.`attendance` ( `employeeID`, `date`, `attendance_Status`) VALUES ( '7', '2024-11-27', 'Present');
INSERT INTO `mts_db`.`attendance` ( `employeeID`, `date`, `attendance_Status`) VALUES ( '7', '2024-11-28', 'Absent');
INSERT INTO `mts_db`.`attendance` ( `employeeID`, `date`, `attendance_Status`) VALUES ( '7', '2024-11-29', 'Present');
INSERT INTO `mts_db`.`attendance` ( `employeeID`, `date`, `attendance_Status`) VALUES ( '8', '2024-11-25', 'Present');
INSERT INTO `mts_db`.`attendance` ( `employeeID`, `date`, `attendance_Status`) VALUES ( '8', '2024-11-26', 'Absent');
INSERT INTO `mts_db`.`attendance` ( `employeeID`, `date`, `attendance_Status`) VALUES ( '8', '2024-11-27', 'Present');
INSERT INTO `mts_db`.`attendance` ( `employeeID`, `date`, `attendance_Status`) VALUES ( '8', '2024-11-28', 'Present');
INSERT INTO `mts_db`.`attendance` ( `employeeID`, `date`, `attendance_Status`) VALUES ( '8', '2024-11-29', 'Present');
INSERT INTO `mts_db`.`attendance` ( `employeeID`, `date`, `attendance_Status`) VALUES ( '9', '2024-11-25', 'Present');
INSERT INTO `mts_db`.`attendance` ( `employeeID`, `date`, `attendance_Status`) VALUES ( '9', '2024-11-26', 'Present');
INSERT INTO `mts_db`.`attendance` ( `employeeID`, `date`, `attendance_Status`) VALUES ( '9', '2024-11-27', 'Present');
INSERT INTO `mts_db`.`attendance` ( `employeeID`, `date`, `attendance_Status`) VALUES ( '9', '2024-11-28', 'Absent');
INSERT INTO `mts_db`.`attendance` ( `employeeID`, `date`, `attendance_Status`) VALUES ( '9', '2024-11-29', 'Present');
INSERT INTO `mts_db`.`attendance` ( `employeeID`, `date`, `attendance_Status`) VALUES ( '10', '2024-11-25', 'Present');
INSERT INTO `mts_db`.`attendance` ( `employeeID`, `date`, `attendance_Status`) VALUES ( '10', '2024-11-26', 'Present');
INSERT INTO `mts_db`.`attendance` ( `employeeID`, `date`, `attendance_Status`) VALUES ( '10', '2024-11-29', 'Present');
INSERT INTO `mts_db`.`attendance` ( `employeeID`, `date`, `attendance_Status`) VALUES ( '10', '2024-11-27', 'Absent');
INSERT INTO `mts_db`.`attendance` ( `employeeID`, `date`, `attendance_Status`) VALUES ( '10', '2024-11-28', 'Present');


CREATE TABLE leave_requests (
  `leave_RequestID` INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
  `employeeID` INT NOT NULL,
  `date` DATE NOT NULL,
  `reason` VARCHAR(255) NOT NULL,
  `leave_status` ENUM ('Approved', 'Pending', 'Denied')NOT NULL,
  FOREIGN KEY (employeeID) REFERENCES Employees(employeeID)
  );

INSERT INTO `mts_db`.`leave_requests` (`leave_RequestID`, `employeeID`, `date`, `reason`, `leave_status`) 
VALUES ('1', '1', '2024-11-22', 'Sick Leave', 'Approved');
INSERT INTO `mts_db`.`leave_requests` (`leave_RequestID`, `employeeID`, `date`, `reason`, `leave_status`) 
VALUES ('2', '1', '2024-12-01', 'Personal', 'Pending');
INSERT INTO `mts_db`.`leave_requests` (`leave_RequestID`, `employeeID`, `date`, `reason`, `leave_status`) 
VALUES ('3', '2', '2024-11-15', 'Family Responsibility', 'Denied');
INSERT INTO `mts_db`.`leave_requests` (`leave_RequestID`, `employeeID`, `date`, `reason`, `leave_status`) 
VALUES ('4', '2', '2024-12-02', 'Vacation', 'Approved');
INSERT INTO `mts_db`.`leave_requests` (`leave_RequestID`, `employeeID`, `date`, `reason`, `leave_status`) 
VALUES ('5', '3', '2024-11-10', 'Medical Appointment', 'Approved');
INSERT INTO `mts_db`.`leave_requests` (`leave_RequestID`, `employeeID`, `date`, `reason`, `leave_status`) 
VALUES ('6', '3', '2024-12-05', 'Personal', 'Pending');
INSERT INTO `mts_db`.`leave_requests` (`leave_RequestID`, `employeeID`, `date`, `reason`, `leave_status`) 
VALUES ('7', '4', '2024-11-20', 'Bereavement', 'Approved');
INSERT INTO `mts_db`.`leave_requests` (`leave_RequestID`, `employeeID`, `date`, `reason`, `leave_status`) 
VALUES ('8', '5', '2024-12-01', 'Child care', 'Pending');
INSERT INTO `mts_db`.`leave_requests` (`leave_RequestID`, `employeeID`, `date`, `reason`, `leave_status`) 
VALUES ('9', '6', '2024-11-18', 'Sick Leave', 'Approved');
INSERT INTO `mts_db`.`leave_requests` (`leave_RequestID`, `employeeID`, `date`, `reason`, `leave_status`) 
VALUES ('10', '7', '2024-11-22', 'Vacation', 'Pending');
INSERT INTO `mts_db`.`leave_requests` (`leave_RequestID`, `employeeID`, `date`, `reason`, `leave_status`) 
VALUES ('11', '8', '2024-12-02', 'Medical Appointment', 'Approved');
INSERT INTO `mts_db`.`leave_requests` (`leave_RequestID`, `employeeID`, `date`, `reason`, `leave_status`) 
VALUES ('12', '9', '2024-11-19', 'Child care', 'Denied');
INSERT INTO `mts_db`.`leave_requests` (`leave_RequestID`, `employeeID`, `date`, `reason`, `leave_status`) 
VALUES ('13', '10', '2024-12-03', 'Vacation', 'Pending');
    
CREATE TABLE  payroll (
	`payroll_ID` INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`employeeID` INT NOT NULL,
	`hours_worked` INT NOT NULL,
	`leave_deductions` INT NOT NULL,
	`final_salary` DECIMAL(10,2) NOT NULL,
    `performance` VARCHAR(50),
	FOREIGN KEY (employeeID) REFERENCES Employees(employeeID)
    );
    
INSERT INTO `mts_db`.`payroll` (`payroll_ID`, `employeeID`, `hours_worked`, `leave_deductions`, `final_salary`, `performance`) VALUES ('1', '1', '160', '8', '69500', 'Good');
INSERT INTO `mts_db`.`payroll` (`employeeID`, `hours_worked`, `leave_deductions`, `final_salary`, `performance`) VALUES ('2', '150', '10', '79000', 'Good');
INSERT INTO `mts_db`.`payroll` (`employeeID`, `hours_worked`, `leave_deductions`, `final_salary`, `performance`) VALUES ('3', '170', '4', '54800', 'Good');
INSERT INTO `mts_db`.`payroll` (`employeeID`, `hours_worked`, `leave_deductions`, `final_salary`, `performance`) VALUES ('4', '165', '6', '59700', 'Bad');
INSERT INTO `mts_db`.`payroll` (`employeeID`, `hours_worked`, `leave_deductions`, `final_salary`, `performance`) VALUES ('5', '158', '5', '57850', 'Bad');
INSERT INTO `mts_db`.`payroll` (`employeeID`, `hours_worked`, `leave_deductions`, `final_salary`, `performance`) VALUES ('6', '168', '2', '64800', 'Average');
INSERT INTO `mts_db`.`payroll` (`employeeID`, `hours_worked`, `leave_deductions`, `final_salary`, `performance`) VALUES ('7', '175', '3', '71800', 'Average');
INSERT INTO `mts_db`.`payroll` (`employeeID`, `hours_worked`, `leave_deductions`, `final_salary`, `performance`) VALUES ('8', '160', '0', '56000', 'Average');
INSERT INTO `mts_db`.`payroll` (`employeeID`, `hours_worked`, `leave_deductions`, `final_salary`, `performance`) VALUES ('9', '155', '5', '61500', 'Average');
INSERT INTO `mts_db`.`payroll` (`employeeID`, `hours_worked`, `leave_deductions`, `final_salary`, `performance`) VALUES ('10', '162', '4', '57750', 'Good');


CREATE TABLE `mts_db`.`user_logins` (
  `employeeID` INT NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`employeeID`));

INSERT INTO `mts_db`.`user_logins` (`employeeID`, `name`, `password`) VALUES ('1', 'Sibongile Nkosi', '001');
INSERT INTO `mts_db`.`user_logins` (`employeeID`, `name`, `password`) VALUES ('2', 'Lungile Moyo', '002');
INSERT INTO `mts_db`.`user_logins` (`employeeID`, `name`, `password`) VALUES ('3', 'Thabo Molefe', '003');
INSERT INTO `mts_db`.`user_logins` (`employeeID`, `name`, `password`) VALUES ('4', 'Keshav Naidoo', '004');
INSERT INTO `mts_db`.`user_logins` (`employeeID`, `name`, `password`) VALUES ('5', 'Zanele Khumalo', '005');
INSERT INTO `mts_db`.`user_logins` (`employeeID`, `name`, `password`) VALUES ('6', 'Sipho Zulu', '006');
INSERT INTO `mts_db`.`user_logins` (`employeeID`, `name`, `password`) VALUES ('7', 'Naledi Moeketsi', '007');
INSERT INTO `mts_db`.`user_logins` (`employeeID`, `name`, `password`) VALUES ('8', 'Farai Gumbo', '008');
INSERT INTO `mts_db`.`user_logins` (`employeeID`, `name`, `password`) VALUES ('9', 'Karabo Dlamini', '009');
INSERT INTO `mts_db`.`user_logins` (`employeeID`, `name`, `password`) VALUES ('10', 'Fatima Pate', '010');
