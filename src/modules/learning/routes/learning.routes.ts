import { Router } from 'express';
import { LearningController } from '../controllers/learning.controller';
import { RequestHandler } from 'express';
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

const router = Router();
const learningController = new LearningController();

// Course Routes
router.get('/courses', learningController.getAllCourses as RequestHandler);
router.get('/courses/:id', learningController.getCourseById as RequestHandler);
router.post('/courses', learningController.createCourse as RequestHandler);
router.put('/courses/:id', learningController.updateCourse as RequestHandler);
router.post('/courses/:id/publish', learningController.publishCourse as RequestHandler);

// Course Module Routes
router.get('/courses/:courseId/modules', learningController.getCourseModules as RequestHandler);
router.get('/course-modules/:id', learningController.getCourseModuleById as RequestHandler);
router.post('/course-modules', learningController.createCourseModule as RequestHandler);
router.put('/course-modules/:id', learningController.updateCourseModule as RequestHandler);
router.delete('/course-modules/:id', learningController.deleteCourseModule as RequestHandler);

// Course Enrollment Routes
router.get('/enrollments', learningController.getAllCourseEnrollments as RequestHandler);
router.get('/enrollments/:id', learningController.getCourseEnrollmentById as RequestHandler);
router.post('/enrollments', learningController.createCourseEnrollment as RequestHandler);
router.put('/enrollments/:id', learningController.updateCourseEnrollment as RequestHandler);

// Course Enrollment by Course Routes
router.get('/courses/:courseId/enrollments', learningController.getEnrollmentsByCourse as RequestHandler);

// Course Enrollment by Personnel Routes
router.get('/personnel/:personnelId/enrollments', learningController.getEnrollmentsByPersonnel as RequestHandler);

export default router; 