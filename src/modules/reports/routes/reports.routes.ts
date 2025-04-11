import { Router } from 'express';
import { ReportController } from '../controllers/report.controller';

const router = Router();
const reportsController = new ReportController();

// Basic CRUD operations
router.get('/', reportsController.getAllReports.bind(reportsController));
router.get('/:id', reportsController.getReportById.bind(reportsController));
router.post('/', reportsController.createReport.bind(reportsController));
router.put('/:id', reportsController.updateReport.bind(reportsController));
router.delete('/:id', reportsController.deleteReport.bind(reportsController));

// Report generation
router.post('/:id/generate', reportsController.generateReport.bind(reportsController));

export default router; 