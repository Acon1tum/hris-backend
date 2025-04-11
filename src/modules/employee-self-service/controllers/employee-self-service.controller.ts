import { Request, Response } from 'express';
import { EmployeeSelfServiceService } from '../services/employee-self-service.service';
import {
  CreateEmployeeSelfServiceProfileDto,
  UpdateEmployeeSelfServiceProfileDto,
  CreateEmployeeDocumentDto,
  UpdateEmployeeDocumentDto,
} from '../types/employee-self-service.types';

export class EmployeeSelfServiceController {
  private employeeSelfServiceService: EmployeeSelfServiceService;

  constructor() {
    this.employeeSelfServiceService = new EmployeeSelfServiceService();
  }

  // Profile Management
  async getProfile(req: Request, res: Response): Promise<void> {
    try {
      const { personnelId } = req.params;
      const profile = await this.employeeSelfServiceService.getProfile(personnelId);
      if (!profile) {
        res.status(404).json({ message: 'Profile not found' });
        return;
      }
      res.status(200).json(profile);
    } catch (error) {
      console.error('Error in getProfile controller:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async createProfile(req: Request, res: Response): Promise<void> {
    try {
      const data: CreateEmployeeSelfServiceProfileDto = req.body;
      const profile = await this.employeeSelfServiceService.createProfile(data);
      res.status(201).json(profile);
    } catch (error) {
      console.error('Error in createProfile controller:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async updateProfile(req: Request, res: Response): Promise<void> {
    try {
      const { personnelId } = req.params;
      const data: UpdateEmployeeSelfServiceProfileDto = req.body;
      const profile = await this.employeeSelfServiceService.updateProfile(personnelId, data);
      if (!profile) {
        res.status(404).json({ message: 'Profile not found' });
        return;
      }
      res.status(200).json(profile);
    } catch (error) {
      console.error('Error in updateProfile controller:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  // Document Management
  async getDocuments(req: Request, res: Response): Promise<void> {
    try {
      const { personnelId } = req.params;
      const documents = await this.employeeSelfServiceService.getDocuments(personnelId);
      res.status(200).json(documents);
    } catch (error) {
      console.error('Error in getDocuments controller:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getDocumentById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const document = await this.employeeSelfServiceService.getDocumentById(id);
      if (!document) {
        res.status(404).json({ message: 'Document not found' });
        return;
      }
      res.status(200).json(document);
    } catch (error) {
      console.error('Error in getDocumentById controller:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async createDocument(req: Request, res: Response): Promise<void> {
    try {
      const data: CreateEmployeeDocumentDto = req.body;
      const document = await this.employeeSelfServiceService.createDocument(data);
      res.status(201).json(document);
    } catch (error) {
      console.error('Error in createDocument controller:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async updateDocument(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const data: UpdateEmployeeDocumentDto = req.body;
      const document = await this.employeeSelfServiceService.updateDocument(id, data);
      if (!document) {
        res.status(404).json({ message: 'Document not found' });
        return;
      }
      res.status(200).json(document);
    } catch (error) {
      console.error('Error in updateDocument controller:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async deleteDocument(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const document = await this.employeeSelfServiceService.deleteDocument(id);
      if (!document) {
        res.status(404).json({ message: 'Document not found' });
        return;
      }
      res.status(200).json(document);
    } catch (error) {
      console.error('Error in deleteDocument controller:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  // Skills and Certifications
  async updateSkills(req: Request, res: Response): Promise<void> {
    try {
      const { personnelId } = req.params;
      const { skills } = req.body;
      const profile = await this.employeeSelfServiceService.updateSkills(personnelId, skills);
      if (!profile) {
        res.status(404).json({ message: 'Profile not found' });
        return;
      }
      res.status(200).json(profile);
    } catch (error) {
      console.error('Error in updateSkills controller:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async updateCertifications(req: Request, res: Response): Promise<void> {
    try {
      const { personnelId } = req.params;
      const { certifications } = req.body;
      const profile = await this.employeeSelfServiceService.updateCertifications(personnelId, certifications);
      if (!profile) {
        res.status(404).json({ message: 'Profile not found' });
        return;
      }
      res.status(200).json(profile);
    } catch (error) {
      console.error('Error in updateCertifications controller:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
} 