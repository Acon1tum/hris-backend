import { Router } from 'express';
import { TimekeepingController } from '../controllers/timekeeping.controller';

const router = Router();
const timekeepingController = new TimekeepingController();

// Attendance Log Routes
router.get('/attendance-logs', timekeepingController.getAllAttendanceLogs.bind(timekeepingController));
router.get('/attendance-logs/:id', timekeepingController.getAttendanceLogById.bind(timekeepingController));
router.post('/attendance-logs', timekeepingController.createAttendanceLog.bind(timekeepingController));
router.put('/attendance-logs/:id', timekeepingController.updateAttendanceLog.bind(timekeepingController));

// DTR Adjustment Request Routes
router.get('/dtr-adjustments', timekeepingController.getAllDtrAdjustmentRequests.bind(timekeepingController));
router.get('/dtr-adjustments/:id', timekeepingController.getDtrAdjustmentRequestById.bind(timekeepingController));
router.post('/dtr-adjustments', timekeepingController.createDtrAdjustmentRequest.bind(timekeepingController));
router.put('/dtr-adjustments/:id', timekeepingController.updateDtrAdjustmentRequest.bind(timekeepingController));
router.post('/dtr-adjustments/:id/approve', timekeepingController.approveDtrAdjustmentRequest.bind(timekeepingController));
router.post('/dtr-adjustments/:id/reject', timekeepingController.rejectDtrAdjustmentRequest.bind(timekeepingController));

export default router; 