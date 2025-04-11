import { Router } from 'express';
import { PerformanceController } from '../controllers/performance.controller';

const router = Router();
const performanceController = new PerformanceController();

// Performance Cycle Routes
router.get('/cycles', performanceController.getAllPerformanceCycles.bind(performanceController));
router.get('/cycles/:id', performanceController.getPerformanceCycleById.bind(performanceController));
router.post('/cycles', performanceController.createPerformanceCycle.bind(performanceController));
router.put('/cycles/:id', performanceController.updatePerformanceCycle.bind(performanceController));
router.post('/cycles/:id/close', performanceController.closePerformanceCycle.bind(performanceController));

// Performance Goal Routes
router.get('/goals', performanceController.getAllPerformanceGoals.bind(performanceController));
router.get('/goals/:id', performanceController.getPerformanceGoalById.bind(performanceController));
router.get('/personnel/:personnelId/goals', performanceController.getPerformanceGoalsByPersonnel.bind(performanceController));
router.post('/goals', performanceController.createPerformanceGoal.bind(performanceController));
router.put('/goals/:id', performanceController.updatePerformanceGoal.bind(performanceController));
router.delete('/goals/:id', performanceController.deletePerformanceGoal.bind(performanceController));

// Performance Review Routes
router.get('/reviews', performanceController.getAllPerformanceReviews.bind(performanceController));
router.get('/reviews/:id', performanceController.getPerformanceReviewById.bind(performanceController));
router.get('/cycles/:cycleId/reviews', performanceController.getPerformanceReviewsByCycle.bind(performanceController));
router.get('/personnel/:personnelId/reviews', performanceController.getPerformanceReviewsByPersonnel.bind(performanceController));
router.post('/reviews', performanceController.createPerformanceReview.bind(performanceController));
router.put('/reviews/:id', performanceController.updatePerformanceReview.bind(performanceController));
router.post('/reviews/:id/submit', performanceController.submitPerformanceReview.bind(performanceController));
router.post('/reviews/:id/approve', performanceController.approvePerformanceReview.bind(performanceController));
router.post('/reviews/:id/reject', performanceController.rejectPerformanceReview.bind(performanceController));

// Performance Feedback Routes
router.get('/feedback', performanceController.getAllPerformanceFeedback.bind(performanceController));
router.get('/feedback/:id', performanceController.getPerformanceFeedbackById.bind(performanceController));
router.get('/reviews/:reviewId/feedback', performanceController.getPerformanceFeedbackByReview.bind(performanceController));
router.get('/personnel/:personnelId/feedback', performanceController.getPerformanceFeedbackByPersonnel.bind(performanceController));
router.post('/feedback', performanceController.createPerformanceFeedback.bind(performanceController));
router.put('/feedback/:id', performanceController.updatePerformanceFeedback.bind(performanceController));
router.delete('/feedback/:id', performanceController.deletePerformanceFeedback.bind(performanceController));

// Performance Rating Routes
router.get('/ratings', performanceController.getAllPerformanceRatings.bind(performanceController));
router.get('/ratings/:id', performanceController.getPerformanceRatingById.bind(performanceController));
router.get('/reviews/:reviewId/ratings', performanceController.getPerformanceRatingsByReview.bind(performanceController));
router.get('/personnel/:personnelId/ratings', performanceController.getPerformanceRatingsByPersonnel.bind(performanceController));
router.post('/ratings', performanceController.createPerformanceRating.bind(performanceController));
router.put('/ratings/:id', performanceController.updatePerformanceRating.bind(performanceController));

export default router; 