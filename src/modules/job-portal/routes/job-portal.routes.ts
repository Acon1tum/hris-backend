import { Router, RequestHandler } from 'express';
import { JobPortalController } from '../controllers/job-portal.controller';

const router = Router();
const jobPortalController = new JobPortalController();

// Job Posting Routes
router.get('/job-postings', jobPortalController.getAllJobPostings.bind(jobPortalController) as RequestHandler);
router.get('/job-postings/:id', jobPortalController.getJobPostingById.bind(jobPortalController) as RequestHandler);
router.post('/job-postings', jobPortalController.createJobPosting.bind(jobPortalController) as RequestHandler);
router.put('/job-postings/:id', jobPortalController.updateJobPosting.bind(jobPortalController) as RequestHandler);
router.post('/job-postings/:id/close', jobPortalController.closeJobPosting.bind(jobPortalController) as RequestHandler);

// Job Application Routes
router.get('/job-applications', jobPortalController.getAllJobApplications.bind(jobPortalController) as RequestHandler);
router.get('/job-applications/:id', jobPortalController.getJobApplicationById.bind(jobPortalController) as RequestHandler);
router.post('/job-applications', jobPortalController.createJobApplication.bind(jobPortalController) as RequestHandler);
router.put('/job-applications/:id', jobPortalController.updateJobApplication.bind(jobPortalController) as RequestHandler);

// Job Application by Job Posting Routes
router.get('/job-postings/:jobPostingId/applications', jobPortalController.getJobApplicationsByJobPosting.bind(jobPortalController) as RequestHandler);

// Job Application by Applicant Routes
router.get('/applicants/:applicantId/applications', jobPortalController.getJobApplicationsByApplicant.bind(jobPortalController) as RequestHandler);

export default router; 