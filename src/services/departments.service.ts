import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class DepartmentsService {
  async getAllDepartments() {
    return prisma.department.findMany({
      orderBy: {
        department_name: 'asc'
      }
    });
  }

  async getDepartmentById(id: string) {
    return prisma.department.findUnique({
      where: { id }
    });
  }

  async createDepartment(data: { department_name: string; department_head?: string; parent_department_id?: string; description?: string }) {
    return prisma.department.create({
      data
    });
  }

  async updateDepartment(id: string, data: { department_name?: string; department_head?: string; parent_department_id?: string; description?: string }) {
    return prisma.department.update({
      where: { id },
      data
    });
  }

  async deleteDepartment(id: string) {
    return prisma.department.delete({
      where: { id }
    });
  }
} 