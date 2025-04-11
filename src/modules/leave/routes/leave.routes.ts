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

// Leave Request Routes
router.get('/requests', leaveController.getAllLeaveRequests.bind(leaveController));
router.get('/requests/:id', leaveController.getLeaveRequestById.bind(leaveController));
router.get('/personnel/:personnelId/requests', leaveController.getLeaveRequestsByPersonnel.bind(leaveController));
router.post('/requests', leaveController.createLeaveRequest.bind(leaveController));
router.put('/requests/:id', leaveController.updateLeaveRequest.bind(leaveController));
router.post('/requests/:id/approve', leaveController.approveLeaveRequest.bind(leaveController));
router.post('/requests/:id/reject', leaveController.rejectLeaveRequest.bind(leaveController));
router.post('/requests/:id/cancel', leaveController.cancelLeaveRequest.bind(leaveController));

// Leave Usage Routes
router.get('/usage', leaveController.getAllLeaveUsage.bind(leaveController));
router.get('/usage/:id', leaveController.getLeaveUsageById.bind(leaveController));
router.get('/personnel/:personnelId/usage', leaveController.getLeaveUsageByPersonnel.bind(leaveController));
router.post('/usage', leaveController.createLeaveUsage.bind(leaveController));
router.put('/usage/:id', leaveController.updateLeaveUsage.bind(leaveController));

export default router; 