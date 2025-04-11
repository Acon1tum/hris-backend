import { Router, RequestHandler } from 'express';
import { EmployeeSelfServiceController } from '../controllers/employee-self-service.controller';

const router = Router();
const employeeSelfServiceController = new EmployeeSelfServiceController();

// Profile Management Routes
router.get('/profiles/:personnelId', employeeSelfServiceController.getProfile.bind(employeeSelfServiceController) as RequestHandler);
router.post('/profiles', employeeSelfServiceController.createProfile.bind(employeeSelfServiceController) as RequestHandler);
router.put('/profiles/:personnelId', employeeSelfServiceController.updateProfile.bind(employeeSelfServiceController) as RequestHandler);

// Document Management Routes
router.get('/documents/:personnelId', employeeSelfServiceController.getDocuments.bind(employeeSelfServiceController) as RequestHandler);
router.get('/documents/:id', employeeSelfServiceController.getDocumentById.bind(employeeSelfServiceController) as RequestHandler);
router.post('/documents', employeeSelfServiceController.createDocument.bind(employeeSelfServiceController) as RequestHandler);
router.put('/documents/:id', employeeSelfServiceController.updateDocument.bind(employeeSelfServiceController) as RequestHandler);
router.delete('/documents/:id', employeeSelfServiceController.deleteDocument.bind(employeeSelfServiceController) as RequestHandler);

// Skills and Certifications Routes
router.put('/profiles/:personnelId/skills', employeeSelfServiceController.updateSkills.bind(employeeSelfServiceController) as RequestHandler);
router.put('/profiles/:personnelId/certifications', employeeSelfServiceController.updateCertifications.bind(employeeSelfServiceController) as RequestHandler);

export default router; 