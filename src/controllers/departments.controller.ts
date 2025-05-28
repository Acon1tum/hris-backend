import { Request, Response } from 'express';
import { DepartmentsService } from '../services/departments.service';

const departmentsService = new DepartmentsService();

export class DepartmentsController {
  async getAllDepartments(req: Request, res: Response) {
    try {
      const departments = await departmentsService.getAllDepartments();
      res.json(departments);
    } catch (error) {
      console.error('Error fetching departments:', error);
      res.status(500).json({ message: 'Failed to fetch departments' });
    }
  }

  async getDepartmentById(req: Request<{ id: string }>, res: Response) {
    try {
      const department = await departmentsService.getDepartmentById(req.params.id);
      if (!department) {
        return res.status(404).json({ message: 'Department not found' });
      }
      res.json(department);
    } catch (error) {
      console.error('Error fetching department:', error);
      res.status(500).json({ message: 'Failed to fetch department' });
    }
  }

  async createDepartment(req: Request<{}, {}, { department_name: string; department_head?: string; parent_department_id?: string; description?: string }>, res: Response) {
    try {
      const department = await departmentsService.createDepartment(req.body);
      res.status(201).json(department);
    } catch (error) {
      console.error('Error creating department:', error);
      res.status(500).json({ message: 'Failed to create department' });
    }
  }

  async updateDepartment(req: Request<{ id: string }, {}, { department_name?: string; department_head?: string; parent_department_id?: string; description?: string }>, res: Response) {
    try {
      const department = await departmentsService.updateDepartment(req.params.id, req.body);
      res.json(department);
    } catch (error) {
      console.error('Error updating department:', error);
      res.status(500).json({ message: 'Failed to update department' });
    }
  }

  async deleteDepartment(req: Request<{ id: string }>, res: Response) {
    try {
      await departmentsService.deleteDepartment(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting department:', error);
      res.status(500).json({ message: 'Failed to delete department' });
    }
  }
} 