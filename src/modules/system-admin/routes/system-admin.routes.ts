import { Router } from 'express';
import { SystemAdminController } from '../controllers/system-admin.controller';

const router = Router();
const systemAdminController = new SystemAdminController();

// User Management Routes
router.get('/users', systemAdminController.getAllUsers.bind(systemAdminController));
router.get('/users/:id', systemAdminController.getUserById.bind(systemAdminController));
router.post('/users', systemAdminController.createUser.bind(systemAdminController));
router.put('/users/:id', systemAdminController.updateUser.bind(systemAdminController));
router.delete('/users/:id', systemAdminController.deleteUser.bind(systemAdminController));
router.post('/users/:id/activate', systemAdminController.activateUser.bind(systemAdminController));
router.post('/users/:id/deactivate', systemAdminController.deactivateUser.bind(systemAdminController));
router.post('/users/:id/reset-password', systemAdminController.resetUserPassword.bind(systemAdminController));

// Role Management Routes
router.get('/roles', systemAdminController.getAllRoles.bind(systemAdminController));
router.get('/roles/:id', systemAdminController.getRoleById.bind(systemAdminController));
router.post('/roles', systemAdminController.createRole.bind(systemAdminController));
router.put('/roles/:id', systemAdminController.updateRole.bind(systemAdminController));
router.delete('/roles/:id', systemAdminController.deleteRole.bind(systemAdminController));
router.post('/roles/:id/permissions', systemAdminController.updateRolePermissions.bind(systemAdminController));

// Permission Management Routes
router.get('/permissions', systemAdminController.getAllPermissions.bind(systemAdminController));
router.get('/permissions/:id', systemAdminController.getPermissionById.bind(systemAdminController));
router.post('/permissions', systemAdminController.createPermission.bind(systemAdminController));
router.put('/permissions/:id', systemAdminController.updatePermission.bind(systemAdminController));
router.delete('/permissions/:id', systemAdminController.deletePermission.bind(systemAdminController));

// System Configuration Routes
router.get('/configurations', systemAdminController.getAllConfigurations.bind(systemAdminController));
router.get('/configurations/:id', systemAdminController.getConfigurationById.bind(systemAdminController));
router.post('/configurations', systemAdminController.createConfiguration.bind(systemAdminController));
router.put('/configurations/:id', systemAdminController.updateConfiguration.bind(systemAdminController));
router.delete('/configurations/:id', systemAdminController.deleteConfiguration.bind(systemAdminController));

// Audit Log Routes
router.get('/audit-logs', systemAdminController.getAllAuditLogs.bind(systemAdminController));
router.get('/audit-logs/:id', systemAdminController.getAuditLogById.bind(systemAdminController));
router.get('/audit-logs/user/:userId', systemAdminController.getAuditLogsByUser.bind(systemAdminController));
router.get('/audit-logs/action/:action', systemAdminController.getAuditLogsByAction.bind(systemAdminController));

// System Maintenance Routes
router.post('/maintenance/backup', systemAdminController.createBackup.bind(systemAdminController));
router.post('/maintenance/restore', systemAdminController.restoreBackup.bind(systemAdminController));
router.get('/maintenance/backups', systemAdminController.getAllBackups.bind(systemAdminController));
router.delete('/maintenance/backups/:id', systemAdminController.deleteBackup.bind(systemAdminController));
router.post('/maintenance/clear-cache', systemAdminController.clearCache.bind(systemAdminController));
router.post('/maintenance/optimize-database', systemAdminController.optimizeDatabase.bind(systemAdminController));

// System Health Routes
router.get('/health/status', systemAdminController.getSystemStatus.bind(systemAdminController));
router.get('/health/database', systemAdminController.getDatabaseHealth.bind(systemAdminController));
router.get('/health/storage', systemAdminController.getStorageHealth.bind(systemAdminController));
router.get('/health/performance', systemAdminController.getPerformanceMetrics.bind(systemAdminController));

export default router; 