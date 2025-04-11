import { Request, Response } from 'express';
import { LearningService } from '../services/learning.service';
import {
  CreateCourseDto,
  UpdateCourseDto,
  CreateCourseModuleDto,
  UpdateCourseModuleDto,
  CreateCourseEnrollmentDto,
  UpdateCourseEnrollmentDto,
  CourseFilter,
  CourseEnrollmentFilter,
} from '../types/learning.types';

export class LearningController {
  private learningService: LearningService;

  constructor() {
    this.learningService = new LearningService();
  }

  // Course Management
  async getAllCourses(req: Request, res: Response) {
    try {
      const filter: CourseFilter = req.query;
      const courses = await this.learningService.getAllCourses(filter);
      return res.status(200).json(courses);
    } catch (error) {
      console.error('Error in getAllCourses controller:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getCourseById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const course = await this.learningService.getCourseById(id);
      if (!course) {
        return res.status(404).json({ message: 'Course not found' });
      }
      return res.status(200).json(course);
    } catch (error) {
      console.error('Error in getCourseById controller:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async createCourse(req: Request, res: Response) {
    try {
      const data: CreateCourseDto = req.body;
      const course = await this.learningService.createCourse(data);
      return res.status(201).json(course);
    } catch (error) {
      console.error('Error in createCourse controller:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async updateCourse(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data: UpdateCourseDto = req.body;
      const course = await this.learningService.updateCourse(id, data);
      if (!course) {
        return res.status(404).json({ message: 'Course not found' });
      }
      return res.status(200).json(course);
    } catch (error) {
      console.error('Error in updateCourse controller:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async publishCourse(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const course = await this.learningService.publishCourse(id);
      if (!course) {
        return res.status(404).json({ message: 'Course not found' });
      }
      return res.status(200).json(course);
    } catch (error) {
      console.error('Error in publishCourse controller:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  // Course Module Management
  async getCourseModules(req: Request, res: Response) {
    try {
      const { courseId } = req.params;
      const modules = await this.learningService.getCourseModules(courseId);
      return res.status(200).json(modules);
    } catch (error) {
      console.error('Error in getCourseModules controller:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getCourseModuleById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const module = await this.learningService.getCourseModuleById(id);
      if (!module) {
        return res.status(404).json({ message: 'Course module not found' });
      }
      return res.status(200).json(module);
    } catch (error) {
      console.error('Error in getCourseModuleById controller:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async createCourseModule(req: Request, res: Response) {
    try {
      const data: CreateCourseModuleDto = req.body;
      const module = await this.learningService.createCourseModule(data);
      return res.status(201).json(module);
    } catch (error) {
      console.error('Error in createCourseModule controller:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async updateCourseModule(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data: UpdateCourseModuleDto = req.body;
      const module = await this.learningService.updateCourseModule(id, data);
      if (!module) {
        return res.status(404).json({ message: 'Course module not found' });
      }
      return res.status(200).json(module);
    } catch (error) {
      console.error('Error in updateCourseModule controller:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async deleteCourseModule(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const module = await this.learningService.deleteCourseModule(id);
      if (!module) {
        return res.status(404).json({ message: 'Course module not found' });
      }
      return res.status(200).json({ message: 'Course module deleted successfully' });
    } catch (error) {
      console.error('Error in deleteCourseModule controller:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  // Course Enrollment Management
  async getAllCourseEnrollments(req: Request, res: Response) {
    try {
      const filter: CourseEnrollmentFilter = req.query;
      const enrollments = await this.learningService.getAllCourseEnrollments(filter);
      return res.status(200).json(enrollments);
    } catch (error) {
      console.error('Error in getAllCourseEnrollments controller:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getCourseEnrollmentById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const enrollment = await this.learningService.getCourseEnrollmentById(id);
      if (!enrollment) {
        return res.status(404).json({ message: 'Course enrollment not found' });
      }
      return res.status(200).json(enrollment);
    } catch (error) {
      console.error('Error in getCourseEnrollmentById controller:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async createCourseEnrollment(req: Request, res: Response) {
    try {
      const data: CreateCourseEnrollmentDto = req.body;
      const enrollment = await this.learningService.createCourseEnrollment(data);
      return res.status(201).json(enrollment);
    } catch (error) {
      console.error('Error in createCourseEnrollment controller:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async updateCourseEnrollment(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data: UpdateCourseEnrollmentDto = req.body;
      const enrollment = await this.learningService.updateCourseEnrollment(id, data);
      if (!enrollment) {
        return res.status(404).json({ message: 'Course enrollment not found' });
      }
      return res.status(200).json(enrollment);
    } catch (error) {
      console.error('Error in updateCourseEnrollment controller:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getEnrollmentsByCourse(req: Request, res: Response) {
    try {
      const { courseId } = req.params;
      const enrollments = await this.learningService.getEnrollmentsByCourse(courseId);
      return res.status(200).json(enrollments);
    } catch (error) {
      console.error('Error in getEnrollmentsByCourse controller:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getEnrollmentsByPersonnel(req: Request, res: Response) {
    try {
      const { personnelId } = req.params;
      const enrollments = await this.learningService.getEnrollmentsByPersonnel(personnelId);
      return res.status(200).json(enrollments);
    } catch (error) {
      console.error('Error in getEnrollmentsByPersonnel controller:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
} 