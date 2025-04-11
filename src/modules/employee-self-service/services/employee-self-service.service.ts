import { PrismaClient } from '@prisma/client';
import {
  EmployeeSelfServiceProfile,
  CreateEmployeeSelfServiceProfileDto,
  UpdateEmployeeSelfServiceProfileDto,
  EmployeeDocument,
  CreateEmployeeDocumentDto,
  UpdateEmployeeDocumentDto,
} from '../types/employee-self-service.types';

export class EmployeeSelfServiceService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  // Profile Management
  async getProfile(personnelId: string): Promise<EmployeeSelfServiceProfile | null> {
    try {
      return await this.prisma.employeeSelfServiceProfile.findUnique({
        where: { personnelId },
        include: {
          personnel: true,
          education: true,
          workExperience: true,
        },
      });
    } catch (error) {
      console.error('Error in getProfile service:', error);
      throw error;
    }
  }

  async createProfile(data: CreateEmployeeSelfServiceProfileDto): Promise<EmployeeSelfServiceProfile> {
    try {
      return await this.prisma.employeeSelfServiceProfile.create({
        data: {
          personnelId: data.personnelId,
          profilePicture: data.profilePicture,
          bio: data.bio,
          skills: data.skills || [],
          certifications: data.certifications || [],
          education: {
            create: data.education || [],
          },
          workExperience: {
            create: data.workExperience || [],
          },
        },
        include: {
          personnel: true,
          education: true,
          workExperience: true,
        },
      });
    } catch (error) {
      console.error('Error in createProfile service:', error);
      throw error;
    }
  }

  async updateProfile(personnelId: string, data: UpdateEmployeeSelfServiceProfileDto): Promise<EmployeeSelfServiceProfile | null> {
    try {
      return await this.prisma.employeeSelfServiceProfile.update({
        where: { personnelId },
        data: {
          profilePicture: data.profilePicture,
          bio: data.bio,
          skills: data.skills,
          certifications: data.certifications,
          education: {
            deleteMany: {},
            create: data.education || [],
          },
          workExperience: {
            deleteMany: {},
            create: data.workExperience || [],
          },
        },
        include: {
          personnel: true,
          education: true,
          workExperience: true,
        },
      });
    } catch (error) {
      console.error('Error in updateProfile service:', error);
      throw error;
    }
  }

  // Document Management
  async getDocuments(personnelId: string): Promise<EmployeeDocument[]> {
    try {
      return await this.prisma.employeeDocument.findMany({
        where: { personnelId },
        orderBy: { createdAt: 'desc' },
      });
    } catch (error) {
      console.error('Error in getDocuments service:', error);
      throw error;
    }
  }

  async getDocumentById(id: string): Promise<EmployeeDocument | null> {
    try {
      return await this.prisma.employeeDocument.findUnique({
        where: { id },
      });
    } catch (error) {
      console.error('Error in getDocumentById service:', error);
      throw error;
    }
  }

  async createDocument(data: CreateEmployeeDocumentDto): Promise<EmployeeDocument> {
    try {
      return await this.prisma.employeeDocument.create({
        data,
      });
    } catch (error) {
      console.error('Error in createDocument service:', error);
      throw error;
    }
  }

  async updateDocument(id: string, data: UpdateEmployeeDocumentDto): Promise<EmployeeDocument | null> {
    try {
      return await this.prisma.employeeDocument.update({
        where: { id },
        data,
      });
    } catch (error) {
      console.error('Error in updateDocument service:', error);
      throw error;
    }
  }

  async deleteDocument(id: string): Promise<EmployeeDocument | null> {
    try {
      return await this.prisma.employeeDocument.delete({
        where: { id },
      });
    } catch (error) {
      console.error('Error in deleteDocument service:', error);
      throw error;
    }
  }

  // Skills and Certifications
  async updateSkills(personnelId: string, skills: string[]): Promise<EmployeeSelfServiceProfile | null> {
    try {
      return await this.prisma.employeeSelfServiceProfile.update({
        where: { personnelId },
        data: { skills },
        include: {
          personnel: true,
          education: true,
          workExperience: true,
        },
      });
    } catch (error) {
      console.error('Error in updateSkills service:', error);
      throw error;
    }
  }

  async updateCertifications(personnelId: string, certifications: string[]): Promise<EmployeeSelfServiceProfile | null> {
    try {
      return await this.prisma.employeeSelfServiceProfile.update({
        where: { personnelId },
        data: { certifications },
        include: {
          personnel: true,
          education: true,
          workExperience: true,
        },
      });
    } catch (error) {
      console.error('Error in updateCertifications service:', error);
      throw error;
    }
  }
} 