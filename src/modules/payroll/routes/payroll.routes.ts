import { Router } from 'express';
import { PayrollController } from '../controllers/payroll.controller';

const router = Router();
const payrollController = new PayrollController();

// Payroll Period Routes
router.get('/periods', payrollController.getAllPayrollPeriods.bind(payrollController));
router.get('/periods/:id', payrollController.getPayrollPeriodById.bind(payrollController));
router.post('/periods', payrollController.createPayrollPeriod.bind(payrollController));
router.put('/periods/:id', payrollController.updatePayrollPeriod.bind(payrollController));
router.post('/periods/:id/close', payrollController.closePayrollPeriod.bind(payrollController));

// Payroll Component Routes
router.get('/components', payrollController.getAllPayrollComponents.bind(payrollController));
router.get('/components/:id', payrollController.getPayrollComponentById.bind(payrollController));
router.post('/components', payrollController.createPayrollComponent.bind(payrollController));
router.put('/components/:id', payrollController.updatePayrollComponent.bind(payrollController));
router.delete('/components/:id', payrollController.deletePayrollComponent.bind(payrollController));

// Payroll Run Routes
router.get('/runs', payrollController.getAllPayrollRuns.bind(payrollController));
router.get('/runs/:id', payrollController.getPayrollRunById.bind(payrollController));
router.get('/periods/:periodId/runs', payrollController.getPayrollRunsByPeriod.bind(payrollController));
router.post('/runs', payrollController.createPayrollRun.bind(payrollController));
router.post('/runs/:id/process', payrollController.processPayrollRun.bind(payrollController));
router.post('/runs/:id/approve', payrollController.approvePayrollRun.bind(payrollController));
router.post('/runs/:id/reject', payrollController.rejectPayrollRun.bind(payrollController));

// Payroll Entry Routes
router.get('/entries', payrollController.getAllPayrollEntries.bind(payrollController));
router.get('/entries/:id', payrollController.getPayrollEntryById.bind(payrollController));
router.get('/runs/:runId/entries', payrollController.getPayrollEntriesByRun.bind(payrollController));
router.get('/personnel/:personnelId/entries', payrollController.getPayrollEntriesByPersonnel.bind(payrollController));
router.post('/entries', payrollController.createPayrollEntry.bind(payrollController));
router.put('/entries/:id', payrollController.updatePayrollEntry.bind(payrollController));

// Payroll Adjustment Routes
router.get('/adjustments', payrollController.getAllPayrollAdjustments.bind(payrollController));
router.get('/adjustments/:id', payrollController.getPayrollAdjustmentById.bind(payrollController));
router.get('/personnel/:personnelId/adjustments', payrollController.getPayrollAdjustmentsByPersonnel.bind(payrollController));
router.post('/adjustments', payrollController.createPayrollAdjustment.bind(payrollController));
router.put('/adjustments/:id', payrollController.updatePayrollAdjustment.bind(payrollController));
router.post('/adjustments/:id/approve', payrollController.approvePayrollAdjustment.bind(payrollController));
router.post('/adjustments/:id/reject', payrollController.rejectPayrollAdjustment.bind(payrollController));

export default router; 