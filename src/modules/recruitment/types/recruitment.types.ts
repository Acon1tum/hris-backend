import { PostingStatus, ApplicationStatus, InterviewType, InterviewStatus, ExamStatus, ExamResult, Recommendation } from '@prisma/client';

// Job Posting Types
export interface CreateJobPostingDto {
  position_title: string;
  department_id: string;
  job_description: string;
  qualifications: string;
  technical_competencies?: string;
  salary_range?: string;
  employment_type: string;
  num_vacancies?: number;
  application_deadline: Date;
  posting_status?: PostingStatus;
  created_by: string;
}

export interface UpdateJobPostingDto {
  position_title?: string;
  department_id?: string;
  job_description?: string;
  qualifications?: string;
  technical_competencies?: string;
  salary_range?: string;
  employment_type?: string;
  num_vacancies?: number;
  application_deadline?: Date;
  posting_status?: PostingStatus;
}

// Job Applicant Types
export interface CreateJobApplicantDto {
  user_id?: string;
  first_name: string;
  last_name: string;
  middle_name?: string;
  email: string;
  phone: string;
  current_employer?: string;
  highest_education?: string;
  resume_path?: string;
  is_existing_employee?: boolean;
}

export interface UpdateJobApplicantDto {
  user_id?: string;
  first_name?: string;
  last_name?: string;
  middle_name?: string;
  email?: string;
  phone?: string;
  current_employer?: string;
  highest_education?: string;
  resume_path?: string;
  is_existing_employee?: boolean;
}

// Job Application Types
export interface CreateJobApplicationDto {
  position_id: string;
  applicant_id: string;
  cover_letter?: string;
  status?: ApplicationStatus;
}

export interface UpdateJobApplicationDto {
  position_id?: string;
  applicant_id?: string;
  cover_letter?: string;
  status?: ApplicationStatus;
  withdrawn_date?: Date;
  remarks?: string;
}

// Interview Schedule Types
export interface CreateInterviewScheduleDto {
  application_id: string;
  interviewer_id: string;
  interview_date: Date;
  interview_type: InterviewType;
  interview_status?: InterviewStatus;
  interview_location?: string;
  interview_notes?: string;
  rating?: number;
}

export interface UpdateInterviewScheduleDto {
  application_id?: string;
  interviewer_id?: string;
  interview_date?: Date;
  interview_type?: InterviewType;
  interview_status?: InterviewStatus;
  interview_location?: string;
  interview_notes?: string;
  rating?: number;
}

// Examination Schedule Types
export interface CreateExaminationScheduleDto {
  application_id: string;
  exam_type: string;
  exam_date: Date;
  exam_location?: string;
  exam_status?: ExamStatus;
  score?: number;
  passing_score?: number;
  result?: ExamResult;
  examiner_id?: string;
  notes?: string;
}

export interface UpdateExaminationScheduleDto {
  application_id?: string;
  exam_type?: string;
  exam_date?: Date;
  exam_location?: string;
  exam_status?: ExamStatus;
  score?: number;
  passing_score?: number;
  result?: ExamResult;
  examiner_id?: string;
  notes?: string;
}

// Applicant Assessment Types
export interface CreateApplicantAssessmentDto {
  application_id: string;
  assessor_id: string;
  criteria_technical?: number;
  criteria_experience?: number;
  criteria_education?: number;
  criteria_communication?: number;
  criteria_cultural_fit?: number;
  overall_rating?: number;
  comments?: string;
  recommendation: Recommendation;
}

export interface UpdateApplicantAssessmentDto {
  application_id?: string;
  assessor_id?: string;
  criteria_technical?: number;
  criteria_experience?: number;
  criteria_education?: number;
  criteria_communication?: number;
  criteria_cultural_fit?: number;
  overall_rating?: number;
  comments?: string;
  recommendation?: Recommendation;
} 