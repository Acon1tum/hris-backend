import { Router, RequestHandler } from 'express';
import { RecruitmentController } from '../controllers/recruitment.controller';

const router = Router();
const recruitmentController = new RecruitmentController();

// Job Posting Routes
router.get('/job-postings', recruitmentController.getAllJobPostings as RequestHandler);
router.get('/job-postings/:id', recruitmentController.getJobPostingById as RequestHandler);
router.post('/job-postings', recruitmentController.createJobPosting as RequestHandler);
router.put('/job-postings/:id', recruitmentController.updateJobPosting as RequestHandler);

// Job Applicant Routes
router.get('/applicants', recruitmentController.getAllJobApplicants as RequestHandler);
router.get('/applicants/:id', recruitmentController.getJobApplicantById as RequestHandler);
router.post('/applicants', recruitmentController.createJobApplicant as RequestHandler);
router.put('/applicants/:id', recruitmentController.updateJobApplicant as RequestHandler);

// Job Application Routes
router.get('/applications', recruitmentController.getAllJobApplications as RequestHandler);
router.get('/applications/:id', recruitmentController.getJobApplicationById as RequestHandler);
router.post('/applications', recruitmentController.createJobApplication as RequestHandler);
router.put('/applications/:id', recruitmentController.updateJobApplication as RequestHandler);

// Interview Schedule Routes
router.get('/interviews', recruitmentController.getAllInterviewSchedules as RequestHandler);
router.get('/interviews/:id', recruitmentController.getInterviewScheduleById as RequestHandler);
router.post('/interviews', recruitmentController.createInterviewSchedule as RequestHandler);
router.put('/interviews/:id', recruitmentController.updateInterviewSchedule as RequestHandler);

// Examination Schedule Routes
router.get('/examinations', recruitmentController.getAllExaminationSchedules as RequestHandler);
router.get('/examinations/:id', recruitmentController.getExaminationScheduleById as RequestHandler);
router.post('/examinations', recruitmentController.createExaminationSchedule as RequestHandler);
router.put('/examinations/:id', recruitmentController.updateExaminationSchedule as RequestHandler);

// Applicant Assessment Routes
router.get('/assessments', recruitmentController.getAllApplicantAssessments as RequestHandler);
router.get('/assessments/:id', recruitmentController.getApplicantAssessmentById as RequestHandler);
router.post('/assessments', recruitmentController.createApplicantAssessment as RequestHandler);
router.put('/assessments/:id', recruitmentController.updateApplicantAssessment as RequestHandler);

export default router; 