import { Request, Response } from 'express';
import { RecruitmentService } from '../services/recruitment.service';
import {
  CreateJobPostingDto,
  UpdateJobPostingDto,
  CreateJobApplicantDto,
  UpdateJobApplicantDto,
  CreateJobApplicationDto,
  UpdateJobApplicationDto,
  CreateInterviewScheduleDto,
  UpdateInterviewScheduleDto,
  CreateExaminationScheduleDto,
  UpdateExaminationScheduleDto,
  CreateApplicantAssessmentDto,
  UpdateApplicantAssessmentDto
} from '../types/recruitment.types';

export class RecruitmentController {
  private recruitmentService: RecruitmentService;

  constructor() {
    this.recruitmentService = new RecruitmentService();
  }

  // Job Posting Controllers
  async getAllJobPostings(req: Request, res: Response) {
    try {
      const jobPostings = await this.recruitmentService.getAllJobPostings();
      res.json(jobPostings);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch job postings' });
    }
  }

  async getJobPostingById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const jobPosting = await this.recruitmentService.getJobPostingById(id);
      if (!jobPosting) {
        return res.status(404).json({ error: 'Job posting not found' });
      }
      res.json(jobPosting);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch job posting' });
    }
  }

  async createJobPosting(req: Request, res: Response) {
    try {
      const data: CreateJobPostingDto = req.body;
      const jobPosting = await this.recruitmentService.createJobPosting(data);
      res.status(201).json(jobPosting);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create job posting' });
    }
  }

  async updateJobPosting(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data: UpdateJobPostingDto = req.body;
      const jobPosting = await this.recruitmentService.updateJobPosting(id, data);
      if (!jobPosting) {
        return res.status(404).json({ error: 'Job posting not found' });
      }
      res.json(jobPosting);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update job posting' });
    }
  }

  // Job Applicant Controllers
  async getAllJobApplicants(req: Request, res: Response) {
    try {
      const applicants = await this.recruitmentService.getAllJobApplicants();
      res.json(applicants);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch job applicants' });
    }
  }

  async getJobApplicantById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const applicant = await this.recruitmentService.getJobApplicantById(id);
      if (!applicant) {
        return res.status(404).json({ error: 'Job applicant not found' });
      }
      res.json(applicant);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch job applicant' });
    }
  }

  async createJobApplicant(req: Request, res: Response) {
    try {
      const data: CreateJobApplicantDto = req.body;
      const applicant = await this.recruitmentService.createJobApplicant(data);
      res.status(201).json(applicant);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create job applicant' });
    }
  }

  async updateJobApplicant(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data: UpdateJobApplicantDto = req.body;
      const applicant = await this.recruitmentService.updateJobApplicant(id, data);
      if (!applicant) {
        return res.status(404).json({ error: 'Job applicant not found' });
      }
      res.json(applicant);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update job applicant' });
    }
  }

  // Job Application Controllers
  async getAllJobApplications(req: Request, res: Response) {
    try {
      const applications = await this.recruitmentService.getAllJobApplications();
      res.json(applications);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch job applications' });
    }
  }

  async getJobApplicationById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const application = await this.recruitmentService.getJobApplicationById(id);
      if (!application) {
        return res.status(404).json({ error: 'Job application not found' });
      }
      res.json(application);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch job application' });
    }
  }

  async createJobApplication(req: Request, res: Response) {
    try {
      const data: CreateJobApplicationDto = req.body;
      const application = await this.recruitmentService.createJobApplication(data);
      res.status(201).json(application);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create job application' });
    }
  }

  async updateJobApplication(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data: UpdateJobApplicationDto = req.body;
      const application = await this.recruitmentService.updateJobApplication(id, data);
      if (!application) {
        return res.status(404).json({ error: 'Job application not found' });
      }
      res.json(application);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update job application' });
    }
  }

  // Interview Schedule Controllers
  async getAllInterviewSchedules(req: Request, res: Response) {
    try {
      const interviews = await this.recruitmentService.getAllInterviewSchedules();
      res.json(interviews);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch interview schedules' });
    }
  }

  async getInterviewScheduleById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const interview = await this.recruitmentService.getInterviewScheduleById(id);
      if (!interview) {
        return res.status(404).json({ error: 'Interview schedule not found' });
      }
      res.json(interview);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch interview schedule' });
    }
  }

  async createInterviewSchedule(req: Request, res: Response) {
    try {
      const data: CreateInterviewScheduleDto = req.body;
      const interview = await this.recruitmentService.createInterviewSchedule(data);
      res.status(201).json(interview);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create interview schedule' });
    }
  }

  async updateInterviewSchedule(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data: UpdateInterviewScheduleDto = req.body;
      const interview = await this.recruitmentService.updateInterviewSchedule(id, data);
      if (!interview) {
        return res.status(404).json({ error: 'Interview schedule not found' });
      }
      res.json(interview);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update interview schedule' });
    }
  }

  // Examination Schedule Controllers
  async getAllExaminationSchedules(req: Request, res: Response) {
    try {
      const examinations = await this.recruitmentService.getAllExaminationSchedules();
      res.json(examinations);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch examination schedules' });
    }
  }

  async getExaminationScheduleById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const examination = await this.recruitmentService.getExaminationScheduleById(id);
      if (!examination) {
        return res.status(404).json({ error: 'Examination schedule not found' });
      }
      res.json(examination);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch examination schedule' });
    }
  }

  async createExaminationSchedule(req: Request, res: Response) {
    try {
      const data: CreateExaminationScheduleDto = req.body;
      const examination = await this.recruitmentService.createExaminationSchedule(data);
      res.status(201).json(examination);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create examination schedule' });
    }
  }

  async updateExaminationSchedule(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data: UpdateExaminationScheduleDto = req.body;
      const examination = await this.recruitmentService.updateExaminationSchedule(id, data);
      if (!examination) {
        return res.status(404).json({ error: 'Examination schedule not found' });
      }
      res.json(examination);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update examination schedule' });
    }
  }

  // Applicant Assessment Controllers
  async getAllApplicantAssessments(req: Request, res: Response) {
    try {
      const assessments = await this.recruitmentService.getAllApplicantAssessments();
      res.json(assessments);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch applicant assessments' });
    }
  }

  async getApplicantAssessmentById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const assessment = await this.recruitmentService.getApplicantAssessmentById(id);
      if (!assessment) {
        return res.status(404).json({ error: 'Applicant assessment not found' });
      }
      res.json(assessment);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch applicant assessment' });
    }
  }

  async createApplicantAssessment(req: Request, res: Response) {
    try {
      const data: CreateApplicantAssessmentDto = req.body;
      const assessment = await this.recruitmentService.createApplicantAssessment(data);
      res.status(201).json(assessment);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create applicant assessment' });
    }
  }

  async updateApplicantAssessment(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data: UpdateApplicantAssessmentDto = req.body;
      const assessment = await this.recruitmentService.updateApplicantAssessment(id, data);
      if (!assessment) {
        return res.status(404).json({ error: 'Applicant assessment not found' });
      }
      res.json(assessment);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update applicant assessment' });
    }
  }
} 