import { Router, RequestHandler } from 'express';
import { PerformanceController } from '../controllers/performance.controller';

const router = Router();
const performanceController = new PerformanceController();

// Performance Review Routes
router.get('/reviews', performanceController.getAllPerformanceReviews as RequestHandler);
router.get('/reviews/:id', performanceController.getPerformanceReviewById as RequestHandler);
router.get('/personnel/:personnelId/reviews', performanceController.getPerformanceReviewsByPersonnel as RequestHandler);
router.post('/reviews', performanceController.createPerformanceReview as RequestHandler);
router.put('/reviews/:id', performanceController.updatePerformanceReview as RequestHandler);

// Performance Evaluation Routes
router.get('/evaluations', performanceController.getAllPerformanceEvaluations as RequestHandler);
router.get('/evaluations/:id', performanceController.getPerformanceEvaluationById as RequestHandler);
router.get('/personnel/:personnelId/evaluations', performanceController.getPerformanceEvaluationsByPersonnel as RequestHandler);
router.post('/evaluations', performanceController.createPerformanceEvaluation as RequestHandler);
router.put('/evaluations/:id', performanceController.updatePerformanceEvaluation as RequestHandler);

export default router; 