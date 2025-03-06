# Employee Management System

## Project Overview

 Employee Management System is a web-based application designed to streamline employee data management, skill assessments, and approval processes. The system provides separate dashboards for HR, employees, and managers, ensuring a structured workflow.

## Features

## HR Role:

- Creates login credentials for employees.

- Manages employee data.

## Employee Role:

- Completes personal information and skill assessment form.

- Views their profile and updates information.

## Manager Role:

- Reviews employee skill assessments and approves or rejects them.

- Searches for employees with specific skills.

- Receives email notifications for approval requests.

## Email Notifications:

- Managers receive emails for skill assessment approval requests.

- Employees receive emails on approval or rejection of their skill assessments.

## Tech Stack

- Frontend: React.js, HTML, CSS, JavaScript

- Backend: C#, .NET

- Database: MSSQL

- Authentication: JWT (JSON Web Token)

- Email Service: SMTP for automated email notifications

- Hosting: IIS (for localhost deployment)

## Workflow

- HR creates employee credentials.

- Employee logs in and completes their profile and skill assessment.

- Manager reviews and approves or rejects skill assessments.

- Employees can update their profile as needed.

- Managers can search for employees based on skills.

- Email notifications are sent to managers for approvals and to employees on approval or rejection.
  
## API Endpoints

| Method | Endpoint | Description | 
| ------ | -------- | ----------- | 
| POST | `/api/auth/login` | User login |
| POST | `/api/hr/createEmployee` | Create a new employee |
| GET | `/api/employee/profile` | Get employee profile |
| PUT | `/api/employee/update` | Update employee information |
| GET | `/api/manager/skills` | Search employees by skills |
| POST | `/api/notifications/send` | Send email notifications |

## Future Enhancements

- Implement role-based access control (RBAC).

- Add real-time notifications.

- Integrate performance review and feedback system.
