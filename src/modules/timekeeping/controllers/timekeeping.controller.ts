import { Request, Response } from 'express';
import { TimekeepingService } from '../services/timekeeping.service';
import { 
  CreateAttendanceLogDto, 
  UpdateAttendanceLogDto,
  CreateDtrAdjustmentRequestDto,
  UpdateDtrAdjustmentRequestDto
} from '../types/timekeeping.types';

export class TimekeepingController {
  private timekeepingService: TimekeepingService;

  constructor() {
    this.timekeepingService = new TimekeepingService();
  }

  // Attendance Log Methods
  async getAllAttendanceLogs(req: Request, res: Response): Promise<void> {
    try {
      const logs = await this.timekeepingService.getAllAttendanceLogs();
      res.json(logs);
    } catch (error) {
      console.error('Error in getAllAttendanceLogs controller:', error);
      res.status(500).json({ error: 'Failed to fetch attendance logs' });
    }
  }

  async getAttendanceLogById(req: Request<{ id: string }>, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const log = await this.timekeepingService.getAttendanceLogById(id);
      if (!log) {
        res.status(404).json({ error: 'Attendance log not found' });
        return;
      }
      res.json(log);
    } catch (error) {
      console.error('Error in getAttendanceLogById controller:', error);
      res.status(500).json({ error: 'Failed to fetch attendance log' });
    }
  }

  async createAttendanceLog(req: Request<{}, {}, CreateAttendanceLogDto>, res: Response): Promise<void> {
    try {
      const log = await this.timekeepingService.createAttendanceLog(req.body);
      res.status(201).json(log);
    } catch (error) {
      console.error('Error in createAttendanceLog controller:', error);
      res.status(500).json({ error: 'Failed to create attendance log' });
    }
  }

  async updateAttendanceLog(req: Request<{ id: string }, {}, UpdateAttendanceLogDto>, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const log = await this.timekeepingService.updateAttendanceLog(id, req.body);
      if (!log) {
        res.status(404).json({ error: 'Attendance log not found' });
        return;
      }
      res.json(log);
    } catch (error) {
      console.error('Error in updateAttendanceLog controller:', error);
      res.status(500).json({ error: 'Failed to update attendance log' });
    }
  }

  // DTR Adjustment Request Methods
  async getAllDtrAdjustmentRequests(req: Request, res: Response): Promise<void> {
    try {
      const requests = await this.timekeepingService.getAllDtrAdjustmentRequests();
      res.json(requests);
    } catch (error) {
      console.error('Error in getAllDtrAdjustmentRequests controller:', error);
      res.status(500).json({ error: 'Failed to fetch DTR adjustment requests' });
    }
  }

  async getDtrAdjustmentRequestById(req: Request<{ id: string }>, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const request = await this.timekeepingService.getDtrAdjustmentRequestById(id);
      if (!request) {
        res.status(404).json({ error: 'DTR adjustment request not found' });
        return;
      }
      res.json(request);
    } catch (error) {
      console.error('Error in getDtrAdjustmentRequestById controller:', error);
      res.status(500).json({ error: 'Failed to fetch DTR adjustment request' });
    }
  }

  async createDtrAdjustmentRequest(req: Request<{}, {}, CreateDtrAdjustmentRequestDto>, res: Response): Promise<void> {
    try {
      const request = await this.timekeepingService.createDtrAdjustmentRequest(req.body);
      res.status(201).json(request);
    } catch (error) {
      console.error('Error in createDtrAdjustmentRequest controller:', error);
      res.status(500).json({ error: 'Failed to create DTR adjustment request' });
    }
  }

  async updateDtrAdjustmentRequest(req: Request<{ id: string }, {}, UpdateDtrAdjustmentRequestDto>, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const request = await this.timekeepingService.updateDtrAdjustmentRequest(id, req.body);
      if (!request) {
        res.status(404).json({ error: 'DTR adjustment request not found' });
        return;
      }
      res.json(request);
    } catch (error) {
      console.error('Error in updateDtrAdjustmentRequest controller:', error);
      res.status(500).json({ error: 'Failed to update DTR adjustment request' });
    }
  }

  async approveDtrAdjustmentRequest(req: Request<{ id: string }>, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { approvedBy } = req.body;
      const request = await this.timekeepingService.approveDtrAdjustmentRequest(id, approvedBy);
      if (!request) {
        res.status(404).json({ error: 'DTR adjustment request not found' });
        return;
      }
      res.json(request);
    } catch (error) {
      console.error('Error in approveDtrAdjustmentRequest controller:', error);
      res.status(500).json({ error: 'Failed to approve DTR adjustment request' });
    }
  }

  async rejectDtrAdjustmentRequest(req: Request<{ id: string }>, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { approvedBy } = req.body;
      const request = await this.timekeepingService.rejectDtrAdjustmentRequest(id, approvedBy);
      if (!request) {
        res.status(404).json({ error: 'DTR adjustment request not found' });
        return;
      }
      res.json(request);
    } catch (error) {
      console.error('Error in rejectDtrAdjustmentRequest controller:', error);
      res.status(500).json({ error: 'Failed to reject DTR adjustment request' });
    }
  }
} 