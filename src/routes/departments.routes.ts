import { Router } from 'express';
import { DepartmentsController } from '../controllers/departments.controller';

const router = Router();
const departmentsController = new DepartmentsController();

// Get all departments
router.get('/', departmentsController.getAllDepartments.bind(departmentsController));

// Get department by ID
router.get('/:id', departmentsController.getDepartmentById.bind(departmentsController));

// Create new department
router.post('/', departmentsController.createDepartment.bind(departmentsController));

// Update department
router.patch('/:id', departmentsController.updateDepartment.bind(departmentsController));

// Delete department
router.delete('/:id', departmentsController.deleteDepartment.bind(departmentsController));

export default router; 