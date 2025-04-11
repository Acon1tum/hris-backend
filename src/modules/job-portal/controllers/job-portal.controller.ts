import { Request, Response } from 'express';
import { JobPortalService } from '../services/job-portal.service';
import {
  CreateJobPostingDto,
  UpdateJobPostingDto,
  CreateJobApplicationDto,
  UpdateJobApplicationDto,
  JobApplicationFilter,
  JobPostingFilter,
} from '../types/job-portal.types';

export class JobPortalController {
  private jobPortalService: JobPortalService;

  constructor() {
    this.jobPortalService = new JobPortalService();
  }

  // Job Posting Management
  async getAllJobPostings(req: Request, res: Response): Promise<void> {
    try {
      const filter: JobPostingFilter = req.query;
      const jobPostings = await this.jobPortalService.getAllJobPostings(filter);
      res.status(200).json(jobPostings);
    } catch (error) {
      console.error('Error in getAllJobPostings controller:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getJobPostingById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const jobPosting = await this.jobPortalService.getJobPostingById(id);
      if (!jobPosting) {
        res.status(404).json({ message: 'Job posting not found' });
        return;
      }
      res.status(200).json(jobPosting);
    } catch (error) {
      console.error('Error in getJobPostingById controller:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async createJobPosting(req: Request, res: Response): Promise<void> {
    try {
      const data: CreateJobPostingDto = req.body;
      const postedBy = req.user?.id;
      
      if (!postedBy) {
        res.status(401).json({ message: 'Unauthorized: User not authenticated' });
        return;
      }

      const jobPosting = await this.jobPortalService.createJobPosting(data, postedBy);
      res.status(201).json(jobPosting);
    } catch (error) {
      console.error('Error in createJobPosting controller:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async updateJobPosting(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const data: UpdateJobPostingDto = req.body;
      const jobPosting = await this.jobPortalService.updateJobPosting(id, data);
      if (!jobPosting) {
        res.status(404).json({ message: 'Job posting not found' });
        return;
      }
      res.status(200).json(jobPosting);
    } catch (error) {
      console.error('Error in updateJobPosting controller:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async closeJobPosting(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const jobPosting = await this.jobPortalService.closeJobPosting(id);
      if (!jobPosting) {
        res.status(404).json({ message: 'Job posting not found' });
        return;
      }
      res.status(200).json(jobPosting);
    } catch (error) {
      console.error('Error in closeJobPosting controller:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  // Job Application Management
  async getAllJobApplications(req: Request, res: Response): Promise<void> {
    try {
      const filter: JobApplicationFilter = req.query;
      const jobApplications = await this.jobPortalService.getAllJobApplications(filter);
      res.status(200).json(jobApplications);
    } catch (error) {
      console.error('Error in getAllJobApplications controller:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getJobApplicationById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const jobApplication = await this.jobPortalService.getJobApplicationById(id);
      if (!jobApplication) {
        res.status(404).json({ message: 'Job application not found' });
        return;
      }
      res.status(200).json(jobApplication);
    } catch (error) {
      console.error('Error in getJobApplicationById controller:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async createJobApplication(req: Request, res: Response): Promise<void> {
    try {
      const data: CreateJobApplicationDto = req.body;
      const jobApplication = await this.jobPortalService.createJobApplication(data);
      res.status(201).json(jobApplication);
    } catch (error) {
      console.error('Error in createJobApplication controller:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async updateJobApplication(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const data: UpdateJobApplicationDto = req.body;
      const jobApplication = await this.jobPortalService.updateJobApplication(id, data);
      if (!jobApplication) {
        res.status(404).json({ message: 'Job application not found' });
        return;
      }
      res.status(200).json(jobApplication);
    } catch (error) {
      console.error('Error in updateJobApplication controller:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getJobApplicationsByJobPosting(req: Request, res: Response): Promise<void> {
    try {
      const { jobPostingId } = req.params;
      const jobApplications = await this.jobPortalService.getJobApplicationsByJobPosting(jobPostingId);
      res.status(200).json(jobApplications);
    } catch (error) {
      console.error('Error in getJobApplicationsByJobPosting controller:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getJobApplicationsByApplicant(req: Request, res: Response): Promise<void> {
    try {
      const { applicantId } = req.params;
      const jobApplications = await this.jobPortalService.getJobApplicationsByApplicant(applicantId);
      res.status(200).json(jobApplications);
    } catch (error) {
      console.error('Error in getJobApplicationsByApplicant controller:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
} 