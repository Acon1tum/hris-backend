import { PrismaClient, PostingStatus, ApplicationStatus, InterviewType, InterviewStatus, ExamStatus, ExamResult, Recommendation, EmploymentType } from '@prisma/client';
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

export class RecruitmentService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  // Job Posting Methods
  async getAllJobPostings(): Promise<any[]> {
    try {
      return await this.prisma.jobPosting.findMany({
        include: {
          department: true,
          job_applications: true,
        },
      });
    } catch (error) {
      console.error('Error in getAllJobPostings service:', error);
      throw error;
    }
  }

  async getJobPostingById(id: string): Promise<any | null> {
    try {
      return await this.prisma.jobPosting.findUnique({
        where: { id },
        include: {
          department: true,
          job_applications: true,
        },
      });
    } catch (error) {
      console.error('Error in getJobPostingById service:', error);
      throw error;
    }
  }

  async createJobPosting(data: CreateJobPostingDto): Promise<any> {
    try {
      return await this.prisma.jobPosting.create({
        data: {
          position_title: data.position_title,
          department_id: data.department_id,
          job_description: data.job_description,
          qualifications: data.qualifications,
          technical_competencies: data.technical_competencies,
          salary_range: data.salary_range,
          employment_type: data.employment_type as EmploymentType,
          num_vacancies: data.num_vacancies,
          application_deadline: data.application_deadline,
          posting_status: data.posting_status || PostingStatus.Draft,
          created_by: data.created_by,
        },
        include: {
          department: true,
          job_applications: true,
        },
      });
    } catch (error) {
      console.error('Error in createJobPosting service:', error);
      throw error;
    }
  }

  async updateJobPosting(id: string, data: UpdateJobPostingDto): Promise<any | null> {
    try {
      return await this.prisma.jobPosting.update({
        where: { id },
        data: {
          position_title: data.position_title,
          department_id: data.department_id,
          job_description: data.job_description,
          qualifications: data.qualifications,
          technical_competencies: data.technical_competencies,
          salary_range: data.salary_range,
          employment_type: data.employment_type as EmploymentType,
          num_vacancies: data.num_vacancies,
          application_deadline: data.application_deadline,
          posting_status: data.posting_status,
        },
        include: {
          department: true,
          job_applications: true,
        },
      });
    } catch (error) {
      console.error('Error in updateJobPosting service:', error);
      throw error;
    }
  }

  async deleteJobPosting(id: string): Promise<void> {
    try {
      await this.prisma.jobPosting.delete({
        where: { id },
      });
    } catch (error) {
      console.error('Error in deleteJobPosting service:', error);
      throw error;
    }
  }

  // Job Applicant Methods
  async getAllJobApplicants(): Promise<any[]> {
    try {
      return await this.prisma.jobApplicant.findMany({
        include: {
          job_applications: true,
        },
      });
    } catch (error) {
      console.error('Error in getAllJobApplicants service:', error);
      throw error;
    }
  }

  async getJobApplicantById(id: string): Promise<any | null> {
    try {
      return await this.prisma.jobApplicant.findUnique({
        where: { id },
        include: {
          job_applications: true,
        },
      });
    } catch (error) {
      console.error('Error in getJobApplicantById service:', error);
      throw error;
    }
  }

  async createJobApplicant(data: CreateJobApplicantDto): Promise<any> {
    try {
      return await this.prisma.jobApplicant.create({
        data: {
          user_id: data.user_id,
          first_name: data.first_name,
          last_name: data.last_name,
          middle_name: data.middle_name,
          email: data.email,
          phone: data.phone,
          current_employer: data.current_employer,
          highest_education: data.highest_education,
          resume_path: data.resume_path,
          is_existing_employee: data.is_existing_employee,
        },
        include: {
          job_applications: true,
        },
      });
    } catch (error) {
      console.error('Error in createJobApplicant service:', error);
      throw error;
    }
  }

  async updateJobApplicant(id: string, data: UpdateJobApplicantDto): Promise<any | null> {
    try {
      return await this.prisma.jobApplicant.update({
        where: { id },
        data: {
          user_id: data.user_id,
          first_name: data.first_name,
          last_name: data.last_name,
          middle_name: data.middle_name,
          email: data.email,
          phone: data.phone,
          current_employer: data.current_employer,
          highest_education: data.highest_education,
          resume_path: data.resume_path,
          is_existing_employee: data.is_existing_employee,
        },
        include: {
          job_applications: true,
        },
      });
    } catch (error) {
      console.error('Error in updateJobApplicant service:', error);
      throw error;
    }
  }

  // Job Application Methods
  async getAllJobApplications(): Promise<any[]> {
    try {
      return await this.prisma.jobApplication.findMany({
        include: {
          position: true,
          applicant: true,
          interview_schedules: true,
          examination_schedules: true,
        },
      });
    } catch (error) {
      console.error('Error in getAllJobApplications service:', error);
      throw error;
    }
  }

  async getJobApplicationById(id: string): Promise<any | null> {
    try {
      return await this.prisma.jobApplication.findUnique({
        where: { id },
        include: {
          position: true,
          applicant: true,
          interview_schedules: true,
          examination_schedules: true,
        },
      });
    } catch (error) {
      console.error('Error in getJobApplicationById service:', error);
      throw error;
    }
  }

  async createJobApplication(data: CreateJobApplicationDto): Promise<any> {
    try {
      return await this.prisma.jobApplication.create({
        data: {
          position_id: data.position_id,
          applicant_id: data.applicant_id,
          cover_letter: data.cover_letter,
          status: data.status || ApplicationStatus.Pending,
        },
        include: {
          position: true,
          applicant: true,
          interview_schedules: true,
          examination_schedules: true,
        },
      });
    } catch (error) {
      console.error('Error in createJobApplication service:', error);
      throw error;
    }
  }

  async updateJobApplication(id: string, data: UpdateJobApplicationDto): Promise<any | null> {
    try {
      return await this.prisma.jobApplication.update({
        where: { id },
        data: {
          position_id: data.position_id,
          applicant_id: data.applicant_id,
          cover_letter: data.cover_letter,
          status: data.status,
          withdrawn_date: data.withdrawn_date,
          remarks: data.remarks,
        },
        include: {
          position: true,
          applicant: true,
          interview_schedules: true,
          examination_schedules: true,
        },
      });
    } catch (error) {
      console.error('Error in updateJobApplication service:', error);
      throw error;
    }
  }

  // Interview Schedule Methods
  async getAllInterviewSchedules(): Promise<any[]> {
    try {
      return await this.prisma.interviewSchedule.findMany({
        include: {
          application: true,
          interviewer: true,
        },
      });
    } catch (error) {
      console.error('Error in getAllInterviewSchedules service:', error);
      throw error;
    }
  }

  async getInterviewScheduleById(id: string): Promise<any | null> {
    try {
      return await this.prisma.interviewSchedule.findUnique({
        where: { id },
        include: {
          application: true,
          interviewer: true,
        },
      });
    } catch (error) {
      console.error('Error in getInterviewScheduleById service:', error);
      throw error;
    }
  }

  async createInterviewSchedule(data: CreateInterviewScheduleDto): Promise<any> {
    try {
      return await this.prisma.interviewSchedule.create({
        data: {
          application_id: data.application_id,
          interviewer_id: data.interviewer_id,
          interview_date: data.interview_date,
          interview_type: data.interview_type,
          interview_status: data.interview_status || InterviewStatus.Scheduled,
          interview_location: data.interview_location,
          interview_notes: data.interview_notes,
          rating: data.rating,
        },
        include: {
          application: true,
          interviewer: true,
        },
      });
    } catch (error) {
      console.error('Error in createInterviewSchedule service:', error);
      throw error;
    }
  }

  async updateInterviewSchedule(id: string, data: UpdateInterviewScheduleDto): Promise<any | null> {
    try {
      return await this.prisma.interviewSchedule.update({
        where: { id },
        data: {
          application_id: data.application_id,
          interviewer_id: data.interviewer_id,
          interview_date: data.interview_date,
          interview_type: data.interview_type,
          interview_status: data.interview_status,
          interview_location: data.interview_location,
          interview_notes: data.interview_notes,
          rating: data.rating,
        },
        include: {
          application: true,
          interviewer: true,
        },
      });
    } catch (error) {
      console.error('Error in updateInterviewSchedule service:', error);
      throw error;
    }
  }

  // Examination Schedule Methods
  async getAllExaminationSchedules(): Promise<any[]> {
    try {
      return await this.prisma.examinationSchedule.findMany({
        include: {
          application: true,
          examiner: true,
        },
      });
    } catch (error) {
      console.error('Error in getAllExaminationSchedules service:', error);
      throw error;
    }
  }

  async getExaminationScheduleById(id: string): Promise<any | null> {
    try {
      return await this.prisma.examinationSchedule.findUnique({
        where: { id },
        include: {
          application: true,
          examiner: true,
        },
      });
    } catch (error) {
      console.error('Error in getExaminationScheduleById service:', error);
      throw error;
    }
  }

  async createExaminationSchedule(data: CreateExaminationScheduleDto): Promise<any> {
    try {
      return await this.prisma.examinationSchedule.create({
        data: {
          application_id: data.application_id,
          exam_type: data.exam_type,
          exam_date: data.exam_date,
          exam_location: data.exam_location,
          exam_status: data.exam_status || ExamStatus.Scheduled,
          score: data.score,
          passing_score: data.passing_score,
          result: data.result,
          examiner_id: data.examiner_id,
          notes: data.notes,
        },
        include: {
          application: true,
          examiner: true,
        },
      });
    } catch (error) {
      console.error('Error in createExaminationSchedule service:', error);
      throw error;
    }
  }

  async updateExaminationSchedule(id: string, data: UpdateExaminationScheduleDto): Promise<any | null> {
    try {
      return await this.prisma.examinationSchedule.update({
        where: { id },
        data: {
          application_id: data.application_id,
          exam_type: data.exam_type,
          exam_date: data.exam_date,
          exam_location: data.exam_location,
          exam_status: data.exam_status,
          score: data.score,
          passing_score: data.passing_score,
          result: data.result,
          examiner_id: data.examiner_id,
          notes: data.notes,
        },
        include: {
          application: true,
          examiner: true,
        },
      });
    } catch (error) {
      console.error('Error in updateExaminationSchedule service:', error);
      throw error;
    }
  }

  // Applicant Assessment Methods
  async getAllApplicantAssessments(): Promise<any[]> {
    try {
      return await this.prisma.applicantAssessment.findMany({
        include: {
          application: true,
          assessor: true,
        },
      });
    } catch (error) {
      console.error('Error in getAllApplicantAssessments service:', error);
      throw error;
    }
  }

  async getApplicantAssessmentById(id: string): Promise<any | null> {
    try {
      return await this.prisma.applicantAssessment.findUnique({
        where: { id },
        include: {
          application: true,
          assessor: true,
        },
      });
    } catch (error) {
      console.error('Error in getApplicantAssessmentById service:', error);
      throw error;
    }
  }

  async createApplicantAssessment(data: CreateApplicantAssessmentDto): Promise<any> {
    try {
      return await this.prisma.applicantAssessment.create({
        data: {
          application_id: data.application_id,
          assessor_id: data.assessor_id,
          criteria_technical: data.criteria_technical,
          criteria_experience: data.criteria_experience,
          criteria_education: data.criteria_education,
          criteria_communication: data.criteria_communication,
          criteria_cultural_fit: data.criteria_cultural_fit,
          overall_rating: data.overall_rating,
          comments: data.comments,
          recommendation: data.recommendation,
        },
        include: {
          application: true,
          assessor: true,
        },
      });
    } catch (error) {
      console.error('Error in createApplicantAssessment service:', error);
      throw error;
    }
  }

  async updateApplicantAssessment(id: string, data: UpdateApplicantAssessmentDto): Promise<any | null> {
    try {
      return await this.prisma.applicantAssessment.update({
        where: { id },
        data: {
          application_id: data.application_id,
          assessor_id: data.assessor_id,
          criteria_technical: data.criteria_technical,
          criteria_experience: data.criteria_experience,
          criteria_education: data.criteria_education,
          criteria_communication: data.criteria_communication,
          criteria_cultural_fit: data.criteria_cultural_fit,
          overall_rating: data.overall_rating,
          comments: data.comments,
          recommendation: data.recommendation,
        },
        include: {
          application: true,
          assessor: true,
        },
      });
    } catch (error) {
      console.error('Error in updateApplicantAssessment service:', error);
      throw error;
    }
  }
} 