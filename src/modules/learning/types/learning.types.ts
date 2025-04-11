import { CourseStatus, CourseLevel } from '@prisma/client';

export interface Course {
  id: string;
  title: string;
  description: string;
  objectives: string[];
  prerequisites: string[];
  duration: number;
  level: CourseLevel;
  status: CourseStatus;
  instructorId: string;
  instructor: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  category: string;
  tags: string[];
  thumbnailUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CourseModule {
  id: string;
  courseId: string;
  title: string;
  description: string;
  order: number;
  duration: number;
  content: string;
  resources: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CourseEnrollment {
  id: string;
  courseId: string;
  course: Course;
  personnelId: string;
  personnel: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  enrollmentDate: Date;
  completionDate?: Date;
  status: 'ENROLLED' | 'IN_PROGRESS' | 'COMPLETED' | 'DROPPED';
  progress: number;
  lastAccessedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateCourseDto {
  title: string;
  description: string;
  objectives: string[];
  prerequisites: string[];
  duration: number;
  level: CourseLevel;
  instructorId: string;
  category: string;
  tags: string[];
  thumbnailUrl?: string;
}

export interface UpdateCourseDto {
  title?: string;
  description?: string;
  objectives?: string[];
  prerequisites?: string[];
  duration?: number;
  level?: CourseLevel;
  status?: CourseStatus;
  instructorId?: string;
  category?: string;
  tags?: string[];
  thumbnailUrl?: string;
}

export interface CreateCourseModuleDto {
  courseId: string;
  title: string;
  description: string;
  order: number;
  duration: number;
  content: string;
  resources: string[];
}

export interface UpdateCourseModuleDto {
  title?: string;
  description?: string;
  order?: number;
  duration?: number;
  content?: string;
  resources?: string[];
}

export interface CreateCourseEnrollmentDto {
  courseId: string;
  personnelId: string;
}

export interface UpdateCourseEnrollmentDto {
  status?: 'ENROLLED' | 'IN_PROGRESS' | 'COMPLETED' | 'DROPPED';
  progress?: number;
}

export interface CourseFilter {
  status?: CourseStatus;
  level?: CourseLevel;
  category?: string;
  instructorId?: string;
  tags?: string[];
}

export interface CourseEnrollmentFilter {
  status?: 'ENROLLED' | 'IN_PROGRESS' | 'COMPLETED' | 'DROPPED';
  courseId?: string;
  personnelId?: string;
  category?: string;
  level?: CourseLevel;
} 