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

  private transformInstructor(instructor: any) {
    return {
      id: instructor.id,
      firstName: instructor.first_name,
      lastName: instructor.last_name,
      email: instructor.user?.email || '',
    };
  }

  private transformPersonnel(personnel: any) {
    return {
      id: personnel.id,
      firstName: personnel.first_name,
      lastName: personnel.last_name,
      email: personnel.user?.email || '',
    };
  }

  private transformCourse(course: any): Course {
    return {
      ...course,
      instructor: this.transformInstructor(course.instructor),
    };
  }

  private transformCourseEnrollment(enrollment: any): CourseEnrollment {
    return {
      ...enrollment,
      course: this.transformCourse(enrollment.course),
      personnel: this.transformPersonnel(enrollment.personnel),
    };
  }

  // Course Management
  async getAllCourses(filter?: CourseFilter): Promise<Course[]> {
    try {
      const courses = await this.prisma.course.findMany({
        where: {
          status: filter?.status,
          level: filter?.level,
          category: filter?.category,
          instructorId: filter?.instructorId,
          tags: filter?.tags ? { hasSome: filter.tags } : undefined,
        },
        include: {
          instructor: {
            include: {
              user: {
                select: {
                  email: true,
                },
              },
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      });
      return courses.map(course => this.transformCourse(course));
    } catch (error) {
      console.error('Error in getAllCourses service:', error);
      throw error;
    }
  }

  async getCourseById(id: string): Promise<Course | null> {
    try {
      const course = await this.prisma.course.findUnique({
        where: { id },
        include: {
          instructor: {
            include: {
              user: {
                select: {
                  email: true,
                },
              },
            },
          },
        },
      });
      return course ? this.transformCourse(course) : null;
    } catch (error) {
      console.error('Error in getCourseById service:', error);
      throw error;
    }
  }

  async createCourse(data: CreateCourseDto): Promise<Course> {
    try {
      const course = await this.prisma.course.create({
        data: {
          ...data,
          status: CourseStatus.Draft,
        },
        include: {
          instructor: {
            include: {
              user: {
                select: {
                  email: true,
                },
              },
            },
          },
        },
      });
      return this.transformCourse(course);
    } catch (error) {
      console.error('Error in createCourse service:', error);
      throw error;
    }
  }

  async updateCourse(id: string, data: UpdateCourseDto): Promise<Course | null> {
    try {
      const course = await this.prisma.course.update({
        where: { id },
        data,
        include: {
          instructor: {
            include: {
              user: {
                select: {
                  email: true,
                },
              },
            },
          },
        },
      });
      return this.transformCourse(course);
    } catch (error) {
      console.error('Error in updateCourse service:', error);
      throw error;
    }
  }

  async publishCourse(id: string): Promise<Course | null> {
    try {
      const course = await this.prisma.course.update({
        where: { id },
        data: { status: CourseStatus.Published },
        include: {
          instructor: {
            include: {
              user: {
                select: {
                  email: true,
                },
              },
            },
          },
        },
      });
      return this.transformCourse(course);
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
      const enrollments = await this.prisma.courseEnrollment.findMany({
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
                include: {
                  user: {
                    select: {
                      email: true,
                    },
                  },
                },
              },
            },
          },
          personnel: {
            include: {
              user: {
                select: {
                  email: true,
                },
              },
            },
          },
        },
        orderBy: { enrollmentDate: 'desc' },
      });
      return enrollments.map(enrollment => this.transformCourseEnrollment(enrollment));
    } catch (error) {
      console.error('Error in getAllCourseEnrollments service:', error);
      throw error;
    }
  }

  async getCourseEnrollmentById(id: string): Promise<CourseEnrollment | null> {
    try {
      const enrollment = await this.prisma.courseEnrollment.findUnique({
        where: { id },
        include: {
          course: {
            include: {
              instructor: {
                include: {
                  user: {
                    select: {
                      email: true,
                    },
                  },
                },
              },
            },
          },
          personnel: {
            include: {
              user: {
                select: {
                  email: true,
                },
              },
            },
          },
        },
      });
      return enrollment ? this.transformCourseEnrollment(enrollment) : null;
    } catch (error) {
      console.error('Error in getCourseEnrollmentById service:', error);
      throw error;
    }
  }

  async createCourseEnrollment(data: CreateCourseEnrollmentDto): Promise<CourseEnrollment> {
    try {
      const enrollment = await this.prisma.courseEnrollment.create({
        data,
        include: {
          course: {
            include: {
              instructor: {
                include: {
                  user: {
                    select: {
                      email: true,
                    },
                  },
                },
              },
            },
          },
          personnel: {
            include: {
              user: {
                select: {
                  email: true,
                },
              },
            },
          },
        },
      });
      return this.transformCourseEnrollment(enrollment);
    } catch (error) {
      console.error('Error in createCourseEnrollment service:', error);
      throw error;
    }
  }

  async updateCourseEnrollment(id: string, data: UpdateCourseEnrollmentDto): Promise<CourseEnrollment | null> {
    try {
      const enrollment = await this.prisma.courseEnrollment.update({
        where: { id },
        data,
        include: {
          course: {
            include: {
              instructor: {
                include: {
                  user: {
                    select: {
                      email: true,
                    },
                  },
                },
              },
            },
          },
          personnel: {
            include: {
              user: {
                select: {
                  email: true,
                },
              },
            },
          },
        },
      });
      return this.transformCourseEnrollment(enrollment);
    } catch (error) {
      console.error('Error in updateCourseEnrollment service:', error);
      throw error;
    }
  }

  async getEnrollmentsByCourse(courseId: string): Promise<CourseEnrollment[]> {
    try {
      const enrollments = await this.prisma.courseEnrollment.findMany({
        where: { courseId },
        include: {
          course: {
            include: {
              instructor: {
                include: {
                  user: {
                    select: {
                      email: true,
                    },
                  },
                },
              },
            },
          },
          personnel: {
            include: {
              user: {
                select: {
                  email: true,
                },
              },
            },
          },
        },
        orderBy: { enrollmentDate: 'desc' },
      });
      return enrollments.map(enrollment => this.transformCourseEnrollment(enrollment));
    } catch (error) {
      console.error('Error in getEnrollmentsByCourse service:', error);
      throw error;
    }
  }

  async getEnrollmentsByPersonnel(personnelId: string): Promise<CourseEnrollment[]> {
    try {
      const enrollments = await this.prisma.courseEnrollment.findMany({
        where: { personnelId },
        include: {
          course: {
            include: {
              instructor: {
                include: {
                  user: {
                    select: {
                      email: true,
                    },
                  },
                },
              },
            },
          },
          personnel: {
            include: {
              user: {
                select: {
                  email: true,
                },
              },
            },
          },
        },
        orderBy: { enrollmentDate: 'desc' },
      });
      return enrollments.map(enrollment => this.transformCourseEnrollment(enrollment));
    } catch (error) {
      console.error('Error in getEnrollmentsByPersonnel service:', error);
      throw error;
    }
  }
} 