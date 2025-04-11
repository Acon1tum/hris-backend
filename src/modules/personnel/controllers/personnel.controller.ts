import { Request, Response } from 'express';
import { PersonnelService } from '../services/personnel.service';
import { CreatePersonnelDto, UpdatePersonnelDto } from '../types/personnel.types';

export class PersonnelController {
  private personnelService: PersonnelService;

  constructor() {
    this.personnelService = new PersonnelService();
  }

  async getAllPersonnel(req: Request, res: Response): Promise<void> {
    try {
      const personnel = await this.personnelService.getAllPersonnel();
      res.json(personnel);
    } catch (error) {
      console.error('Error in getAllPersonnel:', error);
      res.status(500).json({ error: 'Failed to fetch personnel' });
    }
  }

  async getPersonnelById(req: Request<{ id: string }>, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const personnel = await this.personnelService.getPersonnelById(id);
      if (!personnel) {
        res.status(404).json({ error: 'Personnel not found' });
        return;
      }
      res.json(personnel);
    } catch (error) {
      console.error('Error in getPersonnelById:', error);
      res.status(500).json({ error: 'Failed to fetch personnel' });
    }
  }

  async createPersonnel(req: Request<{}, {}, CreatePersonnelDto>, res: Response): Promise<void> {
    try {
      const personnel = await this.personnelService.createPersonnel(req.body);
      res.status(201).json(personnel);
    } catch (error) {
      console.error('Error in createPersonnel:', error);
      res.status(500).json({ error: 'Failed to create personnel' });
    }
  }

  async updatePersonnel(req: Request<{ id: string }, {}, UpdatePersonnelDto>, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const personnel = await this.personnelService.updatePersonnel(id, req.body);
      if (!personnel) {
        res.status(404).json({ error: 'Personnel not found' });
        return;
      }
      res.json(personnel);
    } catch (error) {
      console.error('Error in updatePersonnel:', error);
      res.status(500).json({ error: 'Failed to update personnel' });
    }
  }

  async deletePersonnel(req: Request<{ id: string }>, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const result = await this.personnelService.deletePersonnel(id);
      if (!result) {
        res.status(404).json({ error: 'Personnel not found' });
        return;
      }
      res.status(204).send();
    } catch (error) {
      console.error('Error in deletePersonnel:', error);
      res.status(500).json({ error: 'Failed to delete personnel' });
    }
  }
} 