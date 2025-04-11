import { Router } from 'express';
import { PayrollController } from '../controllers/payroll.controller';

const router = Router();
const payrollController = new PayrollController();

// Payroll Record Routes
router.get('/records', payrollController.getAllPayrollRecords.bind(payrollController));
router.get('/records/:id', payrollController.getPayrollRecordById.bind(payrollController));
router.get('/personnel/:personnelId/records', payrollController.getPayrollRecordsByPersonnel.bind(payrollController));
router.post('/records', payrollController.createPayrollRecord.bind(payrollController));
router.put('/records/:id', payrollController.updatePayrollRecord.bind(payrollController));

// Deduction Routes
router.post('/deductions', payrollController.createDeduction.bind(payrollController));
router.put('/deductions/:id', payrollController.updateDeduction.bind(payrollController));

// Loan Record Routes
router.get('/loans', payrollController.getAllLoanRecords.bind(payrollController));
router.get('/loans/:id', payrollController.getLoanRecordById.bind(payrollController));
router.get('/personnel/:personnelId/loans', payrollController.getLoanRecordsByPersonnel.bind(payrollController));
router.post('/loans', payrollController.createLoanRecord.bind(payrollController));
router.put('/loans/:id', payrollController.updateLoanRecord.bind(payrollController));
router.post('/loans/:id/update-balance', payrollController.updateLoanBalance.bind(payrollController));

export default router; 