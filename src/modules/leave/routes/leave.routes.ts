import { Router } from 'express';
import { LeaveController } from '../controllers/leave.controller';

const router = Router();
const leaveController = new LeaveController();

// Leave Type Routes
router.get('/types', leaveController.getAllLeaveTypes.bind(leaveController));
router.get('/types/:id', leaveController.getLeaveTypeById.bind(leaveController));
router.post('/types', leaveController.createLeaveType.bind(leaveController));
router.put('/types/:id', leaveController.updateLeaveType.bind(leaveController));
router.delete('/types/:id', leaveController.deleteLeaveType.bind(leaveController));

// Leave Balance Routes
router.get('/balances', leaveController.getAllLeaveBalances.bind(leaveController));
router.get('/balances/:id', leaveController.getLeaveBalanceById.bind(leaveController));
router.get('/personnel/:personnelId/balances', leaveController.getLeaveBalancesByPersonnel.bind(leaveController));
router.post('/balances', leaveController.createLeaveBalance.bind(leaveController));
router.put('/balances/:id', leaveController.updateLeaveBalance.bind(leaveController));

// Leave Application Routes
router.get('/applications', leaveController.getAllLeaveApplications.bind(leaveController));
router.get('/applications/:id', leaveController.getLeaveApplicationById.bind(leaveController));
router.get('/personnel/:personnelId/applications', leaveController.getLeaveApplicationsByPersonnel.bind(leaveController));
router.post('/applications', leaveController.createLeaveApplication.bind(leaveController));
router.put('/applications/:id', leaveController.updateLeaveApplication.bind(leaveController));
router.post('/applications/:id/approve', leaveController.approveLeaveApplication.bind(leaveController));
router.post('/applications/:id/reject', leaveController.rejectLeaveApplication.bind(leaveController));
router.post('/applications/:id/cancel', leaveController.cancelLeaveApplication.bind(leaveController));

export default router; 