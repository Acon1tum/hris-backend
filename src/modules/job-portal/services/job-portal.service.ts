import { PrismaClient, PostingStatus, EmploymentType, ApplicationStatus } from '@prisma/client';
import {
  JobPosting,
  CreateJobPostingDto,
  UpdateJobPostingDto,
  JobApplication,
  CreateJobApplicationDto,
  UpdateJobApplicationDto,
  JobApplicationFilter,
  JobPostingFilter,
} from '../types/job-portal.types';

export class JobPortalService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async createJobPosting(createJobPostingDto: CreateJobPostingDto, userId: string): Promise<JobPosting> {
    return this.prisma.jobPosting.create({
      data: {
        ...createJobPostingDto,
        created_by: userId,
        posting_status: PostingStatus.Draft,
      },
      include: {
        department: {
          select: {
            id: true,
            department_name: true,
          },
        },
      },
    });
  }

  async getAllJobPostings(filter?: JobPostingFilter): Promise<JobPosting[]> {
    return this.prisma.jobPosting.findMany({
      where: {
        posting_status: filter?.status,
        department_id: filter?.departmentId,
        employment_type: filter?.employmentType,
      },
      include: {
        department: {
          select: {
            id: true,
            department_name: true,
          },
        },
      },
    });
  }

  async getJobPostingById(id: string): Promise<JobPosting> {
    const jobPosting = await this.prisma.jobPosting.findUnique({
      where: { id },
      include: {
        department: {
          select: {
            id: true,
            department_name: true,
          },
        },
      },
    });

    if (!jobPosting) {
      throw new Error(`Job posting with ID ${id} not found`);
    }

    return jobPosting;
  }

  async updateJobPosting(id: string, updateJobPostingDto: UpdateJobPostingDto): Promise<JobPosting> {
    const jobPosting = await this.prisma.jobPosting.findUnique({
      where: { id },
    });

    if (!jobPosting) {
      throw new Error(`Job posting with ID ${id} not found`);
    }

    return this.prisma.jobPosting.update({
      where: { id },
      data: updateJobPostingDto,
      include: {
        department: {
          select: {
            id: true,
            department_name: true,
          },
        },
      },
    });
  }

  async deleteJobPosting(id: string): Promise<void> {
    const jobPosting = await this.prisma.jobPosting.findUnique({
      where: { id },
    });

    if (!jobPosting) {
      throw new Error(`Job posting with ID ${id} not found`);
    }

    await this.prisma.jobPosting.delete({
      where: { id },
    });
  }

  async createJobApplication(createJobApplicationDto: CreateJobApplicationDto): Promise<JobApplication> {
    return this.prisma.jobApplication.create({
      data: {
        ...createJobApplicationDto,
        status: ApplicationStatus.Pending,
      },
      include: {
        position: {
          include: {
            department: {
              select: {
                id: true,
                department_name: true,
              },
            },
          },
        },
        applicant: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            phone: true,
          },
        },
      },
    });
  }

  async getAllJobApplications(filter?: JobApplicationFilter): Promise<JobApplication[]> {
    return this.prisma.jobApplication.findMany({
      where: {
        status: filter?.status,
        position_id: filter?.jobPostingId,
        applicant_id: filter?.applicantId,
      },
      include: {
        position: {
          include: {
            department: {
              select: {
                id: true,
                department_name: true,
              },
            },
          },
        },
        applicant: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            phone: true,
          },
        },
      },
    });
  }

  async getJobApplicationById(id: string): Promise<JobApplication> {
    const jobApplication = await this.prisma.jobApplication.findUnique({
      where: { id },
      include: {
        position: {
          include: {
            department: {
              select: {
                id: true,
                department_name: true,
              },
            },
          },
        },
        applicant: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            phone: true,
          },
        },
      },
    });

    if (!jobApplication) {
      throw new Error(`Job application with ID ${id} not found`);
    }

    return jobApplication;
  }

  async updateJobApplication(id: string, updateJobApplicationDto: UpdateJobApplicationDto): Promise<JobApplication> {
    const jobApplication = await this.prisma.jobApplication.findUnique({
      where: { id },
    });

    if (!jobApplication) {
      throw new Error(`Job application with ID ${id} not found`);
    }

    return this.prisma.jobApplication.update({
      where: { id },
      data: updateJobApplicationDto,
      include: {
        position: {
          include: {
            department: {
              select: {
                id: true,
                department_name: true,
              },
            },
          },
        },
        applicant: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            phone: true,
          },
        },
      },
    });
  }

  async getJobApplicationsByApplicant(applicantId: string): Promise<JobApplication[]> {
    return this.prisma.jobApplication.findMany({
      where: { applicant_id: applicantId },
      include: {
        position: {
          include: {
            department: {
              select: {
                id: true,
                department_name: true,
              },
            },
          },
        },
        applicant: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            phone: true,
          },
        },
      },
    });
  }

  async closeJobPosting(id: string): Promise<JobPosting> {
    const jobPosting = await this.prisma.jobPosting.findUnique({
      where: { id },
    });

    if (!jobPosting) {
      throw new Error(`Job posting with ID ${id} not found`);
    }

    return this.prisma.jobPosting.update({
      where: { id },
      data: {
        posting_status: PostingStatus.Closed,
      },
      include: {
        department: {
          select: {
            id: true,
            department_name: true,
          },
        },
      },
    });
  }

  async getJobApplicationsByJobPosting(jobPostingId: string): Promise<JobApplication[]> {
    return this.prisma.jobApplication.findMany({
      where: { position_id: jobPostingId },
      include: {
        position: {
          include: {
            department: {
              select: {
                id: true,
                department_name: true,
              },
            },
          },
        },
        applicant: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            phone: true,
          },
        },
      },
    });
  }
} 