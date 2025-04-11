import { Router } from 'express';
import { LearningController } from '../controllers/learning.controller';

const router = Router();
const learningController = new LearningController();

// Course Routes
router.get('/courses', learningController.getAllCourses.bind(learningController));
router.get('/courses/:id', learningController.getCourseById.bind(learningController));
router.post('/courses', learningController.createCourse.bind(learningController));
router.put('/courses/:id', learningController.updateCourse.bind(learningController));
router.post('/courses/:id/publish', learningController.publishCourse.bind(learningController));

// Course Module Routes
router.get('/courses/:courseId/modules', learningController.getCourseModules.bind(learningController));
router.get('/course-modules/:id', learningController.getCourseModuleById.bind(learningController));
router.post('/course-modules', learningController.createCourseModule.bind(learningController));
router.put('/course-modules/:id', learningController.updateCourseModule.bind(learningController));
router.delete('/course-modules/:id', learningController.deleteCourseModule.bind(learningController));

// Course Enrollment Routes
router.get('/enrollments', learningController.getAllCourseEnrollments.bind(learningController));
router.get('/enrollments/:id', learningController.getCourseEnrollmentById.bind(learningController));
router.post('/enrollments', learningController.createCourseEnrollment.bind(learningController));
router.put('/enrollments/:id', learningController.updateCourseEnrollment.bind(learningController));

// Course Enrollment by Course Routes
router.get('/courses/:courseId/enrollments', learningController.getEnrollmentsByCourse.bind(learningController));

// Course Enrollment by Personnel Routes
router.get('/personnel/:personnelId/enrollments', learningController.getEnrollmentsByPersonnel.bind(learningController));

export default router; 