import { PrismaClient, CourseStatus, CourseLevel } from '@prisma/client';
import {
  Course,
  CourseModule,
  CourseEnrollment,
  CreateCourseDto,
  UpdateCourseDto,
  CreateCourseModuleDto,
  UpdateCourseModuleDto,
  CreateCourseEnrollmentDto,
  UpdateCourseEnrollmentDto,
  CourseFilter,
  CourseEnrollmentFilter,
} from '../types/learning.types';

export class LearningService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  // Course Management
  async getAllCourses(filter?: CourseFilter): Promise<Course[]> {
    try {
      return await this.prisma.course.findMany({
        where: {
          status: filter?.status,
          level: filter?.level,
          category: filter?.category,
          instructorId: filter?.instructorId,
          tags: filter?.tags ? { hasSome: filter.tags } : undefined,
        },
        include: {
          instructor: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      });
    } catch (error) {
      console.error('Error in getAllCourses service:', error);
      throw error;
    }
  }

  async getCourseById(id: string): Promise<Course | null> {
    try {
      return await this.prisma.course.findUnique({
        where: { id },
        include: {
          instructor: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
            },
          },
        },
      });
    } catch (error) {
      console.error('Error in getCourseById service:', error);
      throw error;
    }
  }

  async createCourse(data: CreateCourseDto): Promise<Course> {
    try {
      return await this.prisma.course.create({
        data: {
          ...data,
          status: CourseStatus.DRAFT,
        },
        include: {
          instructor: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
            },
          },
        },
      });
    } catch (error) {
      console.error('Error in createCourse service:', error);
      throw error;
    }
  }

  async updateCourse(id: string, data: UpdateCourseDto): Promise<Course | null> {
    try {
      return await this.prisma.course.update({
        where: { id },
        data,
        include: {
          instructor: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
            },
          },
        },
      });
    } catch (error) {
      console.error('Error in updateCourse service:', error);
      throw error;
    }
  }

  async publishCourse(id: string): Promise<Course | null> {
    try {
      return await this.prisma.course.update({
        where: { id },
        data: { status: CourseStatus.PUBLISHED },
        include: {
          instructor: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
            },
          },
        },
      });
    } catch (error) {
      console.error('Error in publishCourse service:', error);
      throw error;
    }
  }

  // Course Module Management
  async getCourseModules(courseId: string): Promise<CourseModule[]> {
    try {
      return await this.prisma.courseModule.findMany({
        where: { courseId },
        orderBy: { order: 'asc' },
      });
    } catch (error) {
      console.error('Error in getCourseModules service:', error);
      throw error;
    }
  }

  async getCourseModuleById(id: string): Promise<CourseModule | null> {
    try {
      return await this.prisma.courseModule.findUnique({
        where: { id },
      });
    } catch (error) {
      console.error('Error in getCourseModuleById service:', error);
      throw error;
    }
  }

  async createCourseModule(data: CreateCourseModuleDto): Promise<CourseModule> {
    try {
      return await this.prisma.courseModule.create({
        data,
      });
    } catch (error) {
      console.error('Error in createCourseModule service:', error);
      throw error;
    }
  }

  async updateCourseModule(id: string, data: UpdateCourseModuleDto): Promise<CourseModule | null> {
    try {
      return await this.prisma.courseModule.update({
        where: { id },
        data,
      });
    } catch (error) {
      console.error('Error in updateCourseModule service:', error);
      throw error;
    }
  }

  async deleteCourseModule(id: string): Promise<CourseModule | null> {
    try {
      return await this.prisma.courseModule.delete({
        where: { id },
      });
    } catch (error) {
      console.error('Error in deleteCourseModule service:', error);
      throw error;
    }
  }

  // Course Enrollment Management
  async getAllCourseEnrollments(filter?: CourseEnrollmentFilter): Promise<CourseEnrollment[]> {
    try {
      return await this.prisma.courseEnrollment.findMany({
        where: {
          status: filter?.status,
          courseId: filter?.courseId,
          personnelId: filter?.personnelId,
          course: {
            category: filter?.category,
            level: filter?.level,
          },
        },
        include: {
          course: {
            include: {
              instructor: {
                select: {
                  id: true,
                  firstName: true,
                  lastName: true,
                  email: true,
                },
              },
            },
          },
          personnel: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
            },
          },
        },
        orderBy: { enrollmentDate: 'desc' },
      });
    } catch (error) {
      console.error('Error in getAllCourseEnrollments service:', error);
      throw error;
    }
  }

  async getCourseEnrollmentById(id: string): Promise<CourseEnrollment | null> {
    try {
      return await this.prisma.courseEnrollment.findUnique({
        where: { id },
        include: {
          course: {
            include: {
              instructor: {
                select: {
                  id: true,
                  firstName: true,
                  lastName: true,
                  email: true,
                },
              },
            },
          },
          personnel: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
            },
          },
        },
      });
    } catch (error) {
      console.error('Error in getCourseEnrollmentById service:', error);
      throw error;
    }
  }

  async createCourseEnrollment(data: CreateCourseEnrollmentDto): Promise<CourseEnrollment> {
    try {
      return await this.prisma.courseEnrollment.create({
        data: {
          ...data,
          enrollmentDate: new Date(),
          status: 'ENROLLED',
          progress: 0,
          lastAccessedAt: new Date(),
        },
        include: {
          course: {
            include: {
              instructor: {
                select: {
                  id: true,
                  firstName: true,
                  lastName: true,
                  email: true,
                },
              },
            },
          },
          personnel: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
            },
          },
        },
      });
    } catch (error) {
      console.error('Error in createCourseEnrollment service:', error);
      throw error;
    }
  }

  async updateCourseEnrollment(id: string, data: UpdateCourseEnrollmentDto): Promise<CourseEnrollment | null> {
    try {
      return await this.prisma.courseEnrollment.update({
        where: { id },
        data: {
          ...data,
          lastAccessedAt: new Date(),
          completionDate: data.status === 'COMPLETED' ? new Date() : undefined,
        },
        include: {
          course: {
            include: {
              instructor: {
                select: {
                  id: true,
                  firstName: true,
                  lastName: true,
                  email: true,
                },
              },
            },
          },
          personnel: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
            },
          },
        },
      });
    } catch (error) {
      console.error('Error in updateCourseEnrollment service:', error);
      throw error;
    }
  }

  async getEnrollmentsByCourse(courseId: string): Promise<CourseEnrollment[]> {
    try {
      return await this.prisma.courseEnrollment.findMany({
        where: { courseId },
        include: {
          course: {
            include: {
              instructor: {
                select: {
                  id: true,
                  firstName: true,
                  lastName: true,
                  email: true,
                },
              },
            },
          },
          personnel: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
            },
          },
        },
        orderBy: { enrollmentDate: 'desc' },
      });
    } catch (error) {
      console.error('Error in getEnrollmentsByCourse service:', error);
      throw error;
    }
  }

  async getEnrollmentsByPersonnel(personnelId: string): Promise<CourseEnrollment[]> {
    try {
      return await this.prisma.courseEnrollment.findMany({
        where: { personnelId },
        include: {
          course: {
            include: {
              instructor: {
                select: {
                  id: true,
                  firstName: true,
                  lastName: true,
                  email: true,
                },
              },
            },
          },
          personnel: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
            },
          },
        },
        orderBy: { enrollmentDate: 'desc' },
      });
    } catch (error) {
      console.error('Error in getEnrollmentsByPersonnel service:', error);
      throw error;
    }
  }
} 