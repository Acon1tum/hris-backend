import { Request, Response } from 'express';
import { LeaveService } from '../services/leave.service';
import {
  CreateLeaveApplicationDto,
  UpdateLeaveApplicationDto,
  CreateLeaveTypeDto,
  UpdateLeaveTypeDto,
  CreateLeaveBalanceDto,
  UpdateLeaveBalanceDto,
} from '../types/leave.types';

export class LeaveController {
  private leaveService: LeaveService;

  constructor() {
    this.leaveService = new LeaveService();
  }

  // Leave Type Methods
  async getAllLeaveTypes(req: Request, res: Response): Promise<void> {
    try {
      const leaveTypes = await this.leaveService.getAllLeaveTypes();
      res.json(leaveTypes);
    } catch (error) {
      console.error('Error in getAllLeaveTypes:', error);
      res.status(500).json({ error: 'Failed to fetch leave types' });
    }
  }

  async getLeaveTypeById(req: Request<{ id: string }>, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const leaveType = await this.leaveService.getLeaveTypeById(id);
      if (!leaveType) {
        res.status(404).json({ error: 'Leave type not found' });
        return;
      }
      res.json(leaveType);
    } catch (error) {
      console.error('Error in getLeaveTypeById:', error);
      res.status(500).json({ error: 'Failed to fetch leave type' });
    }
  }

  async createLeaveType(req: Request<{}, {}, CreateLeaveTypeDto>, res: Response): Promise<void> {
    try {
      const leaveType = await this.leaveService.createLeaveType(req.body);
      res.status(201).json(leaveType);
    } catch (error) {
      console.error('Error in createLeaveType:', error);
      res.status(500).json({ error: 'Failed to create leave type' });
    }
  }

  async updateLeaveType(req: Request<{ id: string }, {}, UpdateLeaveTypeDto>, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const leaveType = await this.leaveService.updateLeaveType(id, req.body);
      if (!leaveType) {
        res.status(404).json({ error: 'Leave type not found' });
        return;
      }
      res.json(leaveType);
    } catch (error) {
      console.error('Error in updateLeaveType:', error);
      res.status(500).json({ error: 'Failed to update leave type' });
    }
  }

  async deleteLeaveType(req: Request<{ id: string }>, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const result = await this.leaveService.deleteLeaveType(id);
      if (!result) {
        res.status(404).json({ error: 'Leave type not found' });
        return;
      }
      res.status(204).send();
    } catch (error) {
      console.error('Error in deleteLeaveType:', error);
      res.status(500).json({ error: 'Failed to delete leave type' });
    }
  }

  // Leave Balance Methods
  async getAllLeaveBalances(req: Request, res: Response): Promise<void> {
    try {
      const leaveBalances = await this.leaveService.getAllLeaveBalances();
      res.json(leaveBalances);
    } catch (error) {
      console.error('Error in getAllLeaveBalances:', error);
      res.status(500).json({ error: 'Failed to fetch leave balances' });
    }
  }

  async getLeaveBalanceById(req: Request<{ id: string }>, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const leaveBalance = await this.leaveService.getLeaveBalanceById(id);
      if (!leaveBalance) {
        res.status(404).json({ error: 'Leave balance not found' });
        return;
      }
      res.json(leaveBalance);
    } catch (error) {
      console.error('Error in getLeaveBalanceById:', error);
      res.status(500).json({ error: 'Failed to fetch leave balance' });
    }
  }

  async getLeaveBalancesByPersonnel(req: Request<{ personnelId: string }>, res: Response): Promise<void> {
    try {
      const { personnelId } = req.params;
      const leaveBalances = await this.leaveService.getLeaveBalancesByPersonnel(personnelId);
      res.json(leaveBalances);
    } catch (error) {
      console.error('Error in getLeaveBalancesByPersonnel:', error);
      res.status(500).json({ error: 'Failed to fetch leave balances' });
    }
  }

  async createLeaveBalance(req: Request<{}, {}, CreateLeaveBalanceDto>, res: Response): Promise<void> {
    try {
      const leaveBalance = await this.leaveService.createLeaveBalance(req.body);
      res.status(201).json(leaveBalance);
    } catch (error) {
      console.error('Error in createLeaveBalance:', error);
      res.status(500).json({ error: 'Failed to create leave balance' });
    }
  }

  async updateLeaveBalance(req: Request<{ id: string }, {}, UpdateLeaveBalanceDto>, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const leaveBalance = await this.leaveService.updateLeaveBalance(id, req.body);
      if (!leaveBalance) {
        res.status(404).json({ error: 'Leave balance not found' });
        return;
      }
      res.json(leaveBalance);
    } catch (error) {
      console.error('Error in updateLeaveBalance:', error);
      res.status(500).json({ error: 'Failed to update leave balance' });
    }
  }

  // Leave Application Methods
  async getAllLeaveApplications(req: Request, res: Response): Promise<void> {
    try {
      const leaveApplications = await this.leaveService.getAllLeaveApplications();
      res.json(leaveApplications);
    } catch (error) {
      console.error('Error in getAllLeaveApplications:', error);
      res.status(500).json({ error: 'Failed to fetch leave applications' });
    }
  }

  async getLeaveApplicationById(req: Request<{ id: string }>, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const leaveApplication = await this.leaveService.getLeaveApplicationById(id);
      if (!leaveApplication) {
        res.status(404).json({ error: 'Leave application not found' });
        return;
      }
      res.json(leaveApplication);
    } catch (error) {
      console.error('Error in getLeaveApplicationById:', error);
      res.status(500).json({ error: 'Failed to fetch leave application' });
    }
  }

  async getLeaveApplicationsByPersonnel(req: Request<{ personnelId: string }>, res: Response): Promise<void> {
    try {
      const { personnelId } = req.params;
      const leaveApplications = await this.leaveService.getLeaveApplicationsByPersonnel(personnelId);
      res.json(leaveApplications);
    } catch (error) {
      console.error('Error in getLeaveApplicationsByPersonnel:', error);
      res.status(500).json({ error: 'Failed to fetch leave applications' });
    }
  }

  async createLeaveApplication(req: Request<{}, {}, CreateLeaveApplicationDto>, res: Response): Promise<void> {
    try {
      const leaveApplication = await this.leaveService.createLeaveApplication(req.body);
      res.status(201).json(leaveApplication);
    } catch (error) {
      console.error('Error in createLeaveApplication:', error);
      res.status(500).json({ error: 'Failed to create leave application' });
    }
  }

  async updateLeaveApplication(req: Request<{ id: string }, {}, UpdateLeaveApplicationDto>, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const leaveApplication = await this.leaveService.updateLeaveApplication(id, req.body);
      if (!leaveApplication) {
        res.status(404).json({ error: 'Leave application not found' });
        return;
      }
      res.json(leaveApplication);
    } catch (error) {
      console.error('Error in updateLeaveApplication:', error);
      res.status(500).json({ error: 'Failed to update leave application' });
    }
  }

  async approveLeaveApplication(req: Request<{ id: string }>, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const leaveApplication = await this.leaveService.approveLeaveApplication(id);
      if (!leaveApplication) {
        res.status(404).json({ error: 'Leave application not found' });
        return;
      }
      res.json(leaveApplication);
    } catch (error) {
      console.error('Error in approveLeaveApplication:', error);
      res.status(500).json({ error: 'Failed to approve leave application' });
    }
  }

  async rejectLeaveApplication(req: Request<{ id: string }>, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const leaveApplication = await this.leaveService.rejectLeaveApplication(id);
      if (!leaveApplication) {
        res.status(404).json({ error: 'Leave application not found' });
        return;
      }
      res.json(leaveApplication);
    } catch (error) {
      console.error('Error in rejectLeaveApplication:', error);
      res.status(500).json({ error: 'Failed to reject leave application' });
    }
  }

  async cancelLeaveApplication(req: Request<{ id: string }>, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const leaveApplication = await this.leaveService.cancelLeaveApplication(id);
      if (!leaveApplication) {
        res.status(404).json({ error: 'Leave application not found' });
        return;
      }
      res.json(leaveApplication);
    } catch (error) {
      console.error('Error in cancelLeaveApplication:', error);
      res.status(500).json({ error: 'Failed to cancel leave application' });
    }
  }
} 