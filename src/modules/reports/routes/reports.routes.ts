import { Router } from 'express';
import { ReportsController } from '../controllers/reports.controller';

const router = Router();
const reportsController = new ReportsController();

// Attendance Reports
router.get('/attendance/daily', reportsController.getDailyAttendanceReport.bind(reportsController));
router.get('/attendance/monthly', reportsController.getMonthlyAttendanceReport.bind(reportsController));
router.get('/attendance/employee/:employeeId', reportsController.getEmployeeAttendanceReport.bind(reportsController));
router.get('/attendance/department/:departmentId', reportsController.getDepartmentAttendanceReport.bind(reportsController));

// Leave Reports
router.get('/leave/balance', reportsController.getLeaveBalanceReport.bind(reportsController));
router.get('/leave/usage', reportsController.getLeaveUsageReport.bind(reportsController));
router.get('/leave/type/:typeId', reportsController.getLeaveTypeReport.bind(reportsController));
router.get('/leave/department/:departmentId', reportsController.getDepartmentLeaveReport.bind(reportsController));

// Payroll Reports
router.get('/payroll/summary', reportsController.getPayrollSummaryReport.bind(reportsController));
router.get('/payroll/detailed', reportsController.getDetailedPayrollReport.bind(reportsController));
router.get('/payroll/tax', reportsController.getTaxReport.bind(reportsController));
router.get('/payroll/component/:componentId', reportsController.getPayrollComponentReport.bind(reportsController));

// Performance Reports
router.get('/performance/summary', reportsController.getPerformanceSummaryReport.bind(reportsController));
router.get('/performance/department/:departmentId', reportsController.getDepartmentPerformanceReport.bind(reportsController));
router.get('/performance/employee/:employeeId', reportsController.getEmployeePerformanceReport.bind(reportsController));
router.get('/performance/goal/:goalId', reportsController.getGoalPerformanceReport.bind(reportsController));

// Recruitment Reports
router.get('/recruitment/summary', reportsController.getRecruitmentSummaryReport.bind(reportsController));
router.get('/recruitment/job/:jobId', reportsController.getJobPostingReport.bind(reportsController));
router.get('/recruitment/source', reportsController.getRecruitmentSourceReport.bind(reportsController));
router.get('/recruitment/time-to-hire', reportsController.getTimeToHireReport.bind(reportsController));

// Custom Reports
router.get('/custom', reportsController.getCustomReports.bind(reportsController));
router.get('/custom/:id', reportsController.getCustomReportById.bind(reportsController));
router.post('/custom', reportsController.createCustomReport.bind(reportsController));
router.put('/custom/:id', reportsController.updateCustomReport.bind(reportsController));
router.delete('/custom/:id', reportsController.deleteCustomReport.bind(reportsController));
router.post('/custom/:id/run', reportsController.runCustomReport.bind(reportsController));

// Report Templates
router.get('/templates', reportsController.getReportTemplates.bind(reportsController));
router.get('/templates/:id', reportsController.getReportTemplateById.bind(reportsController));
router.post('/templates', reportsController.createReportTemplate.bind(reportsController));
router.put('/templates/:id', reportsController.updateReportTemplate.bind(reportsController));
router.delete('/templates/:id', reportsController.deleteReportTemplate.bind(reportsController));

export default router; 