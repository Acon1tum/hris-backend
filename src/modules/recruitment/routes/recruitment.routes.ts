import { Router } from 'express';
import { RecruitmentController } from '../controllers/recruitment.controller';

const router = Router();
const recruitmentController = new RecruitmentController();

// Job Posting Routes
router.get('/job-postings', recruitmentController.getAllJobPostings.bind(recruitmentController));
router.get('/job-postings/:id', recruitmentController.getJobPostingById.bind(recruitmentController));
router.post('/job-postings', recruitmentController.createJobPosting.bind(recruitmentController));
router.put('/job-postings/:id', recruitmentController.updateJobPosting.bind(recruitmentController));
router.post('/job-postings/:id/publish', recruitmentController.publishJobPosting.bind(recruitmentController));
router.post('/job-postings/:id/close', recruitmentController.closeJobPosting.bind(recruitmentController));

// Application Routes
router.get('/applications', recruitmentController.getAllApplications.bind(recruitmentController));
router.get('/applications/:id', recruitmentController.getApplicationById.bind(recruitmentController));
router.get('/job-postings/:jobPostingId/applications', recruitmentController.getApplicationsByJobPosting.bind(recruitmentController));
router.post('/applications', recruitmentController.createApplication.bind(recruitmentController));
router.put('/applications/:id', recruitmentController.updateApplication.bind(recruitmentController));
router.post('/applications/:id/shortlist', recruitmentController.shortlistApplication.bind(recruitmentController));
router.post('/applications/:id/reject', recruitmentController.rejectApplication.bind(recruitmentController));

// Interview Routes
router.get('/interviews', recruitmentController.getAllInterviews.bind(recruitmentController));
router.get('/interviews/:id', recruitmentController.getInterviewById.bind(recruitmentController));
router.get('/applications/:applicationId/interviews', recruitmentController.getInterviewsByApplication.bind(recruitmentController));
router.post('/interviews', recruitmentController.scheduleInterview.bind(recruitmentController));
router.put('/interviews/:id', recruitmentController.updateInterview.bind(recruitmentController));
router.post('/interviews/:id/complete', recruitmentController.completeInterview.bind(recruitmentController));
router.post('/interviews/:id/cancel', recruitmentController.cancelInterview.bind(recruitmentController));

// Assessment Routes
router.get('/assessments', recruitmentController.getAllAssessments.bind(recruitmentController));
router.get('/assessments/:id', recruitmentController.getAssessmentById.bind(recruitmentController));
router.get('/applications/:applicationId/assessments', recruitmentController.getAssessmentsByApplication.bind(recruitmentController));
router.post('/assessments', recruitmentController.createAssessment.bind(recruitmentController));
router.put('/assessments/:id', recruitmentController.updateAssessment.bind(recruitmentController));
router.post('/assessments/:id/submit', recruitmentController.submitAssessment.bind(recruitmentController));

// Offer Routes
router.get('/offers', recruitmentController.getAllOffers.bind(recruitmentController));
router.get('/offers/:id', recruitmentController.getOfferById.bind(recruitmentController));
router.get('/applications/:applicationId/offers', recruitmentController.getOffersByApplication.bind(recruitmentController));
router.post('/offers', recruitmentController.createOffer.bind(recruitmentController));
router.put('/offers/:id', recruitmentController.updateOffer.bind(recruitmentController));
router.post('/offers/:id/accept', recruitmentController.acceptOffer.bind(recruitmentController));
router.post('/offers/:id/reject', recruitmentController.rejectOffer.bind(recruitmentController));

export default router; 