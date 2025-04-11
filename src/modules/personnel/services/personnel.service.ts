import { PrismaClient, Personnel, Gender, CivilStatus, EmploymentType } from '@prisma/client';
import { CreatePersonnelDto, UpdatePersonnelDto } from '../types/personnel.types';

export class PersonnelService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async getAllPersonnel(): Promise<Personnel[]> {
    try {
      return await this.prisma.personnel.findMany({
        include: {
          department: true,
          employment_history: true,
        },
      });
    } catch (error) {
      console.error('Error in getAllPersonnel service:', error);
      throw error;
    }
  }

  async getPersonnelById(id: string): Promise<Personnel | null> {
    try {
      return await this.prisma.personnel.findUnique({
        where: { id },
        include: {
          department: true,
          employment_history: true,
        },
      });
    } catch (error) {
      console.error('Error in getPersonnelById service:', error);
      throw error;
    }
  }

  async createPersonnel(data: CreatePersonnelDto): Promise<Personnel> {
    try {
      const prismaData = {
        first_name: data.firstName,
        last_name: data.lastName,
        middle_name: data.middleName,
        date_of_birth: data.dateOfBirth,
        gender: data.gender as Gender,
        civil_status: data.civilStatus as CivilStatus,
        contact_number: data.contactNumber,
        address: data.address,
        department_id: data.departmentId,
        designation: data.designation,
        employment_type: data.employmentType as EmploymentType,
        date_hired: data.dateHired,
        salary: data.salary,
        gsis_number: data.gsisNumber,
        pagibig_number: data.pagibigNumber,
        philhealth_number: data.philhealthNumber,
        sss_number: data.sssNumber,
        tin_number: data.tinNumber,
        user_id: data.userId,
      };

      return await this.prisma.personnel.create({
        data: prismaData,
        include: {
          department: true,
          employment_history: true,
        },
      });
    } catch (error) {
      console.error('Error in createPersonnel service:', error);
      throw error;
    }
  }

  async updatePersonnel(id: string, data: UpdatePersonnelDto): Promise<Personnel | null> {
    try {
      const prismaData = {
        first_name: data.firstName,
        last_name: data.lastName,
        middle_name: data.middleName,
        date_of_birth: data.dateOfBirth,
        gender: data.gender as Gender,
        civil_status: data.civilStatus as CivilStatus,
        contact_number: data.contactNumber,
        address: data.address,
        department_id: data.departmentId,
        designation: data.designation,
        employment_type: data.employmentType as EmploymentType,
        date_hired: data.dateHired,
        salary: data.salary,
        gsis_number: data.gsisNumber,
        pagibig_number: data.pagibigNumber,
        philhealth_number: data.philhealthNumber,
        sss_number: data.sssNumber,
        tin_number: data.tinNumber,
      };

      return await this.prisma.personnel.update({
        where: { id },
        data: prismaData,
        include: {
          department: true,
          employment_history: true,
        },
      });
    } catch (error) {
      console.error('Error in updatePersonnel service:', error);
      throw error;
    }
  }

  async deletePersonnel(id: string): Promise<Personnel | null> {
    try {
      return await this.prisma.personnel.delete({
        where: { id },
      });
    } catch (error) {
      console.error('Error in deletePersonnel service:', error);
      throw error;
    }
  }
} 