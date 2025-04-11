import { PostingStatus, EmploymentType, ApplicationStatus } from '@prisma/client';

export interface JobPosting {
  id: string;
  created_at: Date;
  created_by: string;
  position_title: string;
  department_id: string;
  job_description: string;
  qualifications: string;
  technical_competencies: string | null;
  employment_type: EmploymentType;
  application_deadline: Date;
  posting_status: PostingStatus;
  department: {
    id: string;
    department_name: string;
  };
}

export interface JobApplication {
  id: string;
  position_id: string;
  applicant_id: string;
  status: ApplicationStatus;
  application_date: Date;
  cover_letter: string | null;
  remarks: string | null;
  withdrawn_date: Date | null;
  position: JobPosting;
  applicant: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
  };
}

export interface CreateJobPostingDto {
  position_title: string;
  department_id: string;
  job_description: string;
  qualifications: string;
  technical_competencies?: string;
  employment_type: EmploymentType;
  application_deadline: Date;
}

export interface UpdateJobPostingDto {
  position_title?: string;
  department_id?: string;
  job_description?: string;
  qualifications?: string;
  technical_competencies?: string;
  employment_type?: EmploymentType;
  application_deadline?: Date;
  posting_status?: PostingStatus;
}

export interface CreateJobApplicationDto {
  position_id: string;
  applicant_id: string;
  cover_letter?: string;
}

export interface UpdateJobApplicationDto {
  status?: ApplicationStatus;
  remarks?: string;
  withdrawn_date?: Date;
}

export interface JobApplicationFilter {
  status?: ApplicationStatus;
  jobPostingId?: string;
  applicantId?: string;
}

export interface JobPostingFilter {
  status?: PostingStatus;
  departmentId?: string;
  employmentType?: EmploymentType;
} 