import { Router } from 'express';
import { SystemAdminController } from '../controllers/system-admin.controller';

const router = Router();
const systemAdminController = new SystemAdminController();

// System Settings routes
router.get('/settings', systemAdminController.getAllSettings.bind(systemAdminController));
router.get('/settings/:key', systemAdminController.getSettingByKey.bind(systemAdminController));
router.post('/settings', systemAdminController.createSetting.bind(systemAdminController));
router.put('/settings/:key', systemAdminController.updateSetting.bind(systemAdminController));
router.delete('/settings/:key', systemAdminController.deleteSetting.bind(systemAdminController));

// User Management routes
router.get('/users', systemAdminController.getAllUsers.bind(systemAdminController));
router.get('/users/:id', systemAdminController.getUserById.bind(systemAdminController));
router.post('/users', systemAdminController.createUser.bind(systemAdminController));
router.put('/users/:id', systemAdminController.updateUser.bind(systemAdminController));
router.delete('/users/:id', systemAdminController.deleteUser.bind(systemAdminController));
router.patch('/users/:id/status', systemAdminController.changeUserStatus.bind(systemAdminController));

// Audit Logs routes
router.get('/audit-logs', systemAdminController.getAllAuditLogs.bind(systemAdminController));
router.get('/audit-logs/:id', systemAdminController.getAuditLogById.bind(systemAdminController));
router.post('/audit-logs', systemAdminController.createAuditLog.bind(systemAdminController));

export default router; 