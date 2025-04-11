import { Request, Response } from 'express';
import { PayrollService } from '../services/payroll.service';
import {
  CreatePayrollRecordDto,
  UpdatePayrollRecordDto,
  CreateDeductionDto,
  UpdateDeductionDto,
  CreateLoanRecordDto,
  UpdateLoanRecordDto,
} from '../types/payroll.types';

export class PayrollController {
  private payrollService: PayrollService;

  constructor() {
    this.payrollService = new PayrollService();
  }

  // Payroll Record Methods
  async getAllPayrollRecords(req: Request, res: Response): Promise<void> {
    try {
      const records = await this.payrollService.getAllPayrollRecords();
      res.json(records);
    } catch (error) {
      console.error('Error in getAllPayrollRecords:', error);
      res.status(500).json({ error: 'Failed to fetch payroll records' });
    }
  }

  async getPayrollRecordById(req: Request<{ id: string }>, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const record = await this.payrollService.getPayrollRecordById(id);
      if (!record) {
        res.status(404).json({ error: 'Payroll record not found' });
        return;
      }
      res.json(record);
    } catch (error) {
      console.error('Error in getPayrollRecordById:', error);
      res.status(500).json({ error: 'Failed to fetch payroll record' });
    }
  }

  async getPayrollRecordsByPersonnel(req: Request<{ personnelId: string }>, res: Response): Promise<void> {
    try {
      const { personnelId } = req.params;
      const records = await this.payrollService.getPayrollRecordsByPersonnel(personnelId);
      res.json(records);
    } catch (error) {
      console.error('Error in getPayrollRecordsByPersonnel:', error);
      res.status(500).json({ error: 'Failed to fetch payroll records' });
    }
  }

  async createPayrollRecord(req: Request<{}, {}, CreatePayrollRecordDto>, res: Response): Promise<void> {
    try {
      const data: CreatePayrollRecordDto = req.body;
      const record = await this.payrollService.createPayrollRecord(data);
      res.status(201).json(record);
    } catch (error) {
      console.error('Error in createPayrollRecord:', error);
      res.status(500).json({ error: 'Failed to create payroll record' });
    }
  }

  async updatePayrollRecord(req: Request<{ id: string }, {}, UpdatePayrollRecordDto>, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const data: UpdatePayrollRecordDto = req.body;
      const record = await this.payrollService.updatePayrollRecord(id, data);
      if (!record) {
        res.status(404).json({ error: 'Payroll record not found' });
        return;
      }
      res.json(record);
    } catch (error) {
      console.error('Error in updatePayrollRecord:', error);
      res.status(500).json({ error: 'Failed to update payroll record' });
    }
  }

  // Deduction Methods
  async createDeduction(req: Request<{}, {}, CreateDeductionDto>, res: Response): Promise<void> {
    try {
      const data: CreateDeductionDto = req.body;
      const deduction = await this.payrollService.createDeduction(data);
      res.status(201).json(deduction);
    } catch (error) {
      console.error('Error in createDeduction:', error);
      res.status(500).json({ error: 'Failed to create deduction' });
    }
  }

  async updateDeduction(req: Request<{ id: string }, {}, UpdateDeductionDto>, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const data: UpdateDeductionDto = req.body;
      const deduction = await this.payrollService.updateDeduction(id, data);
      if (!deduction) {
        res.status(404).json({ error: 'Deduction not found' });
        return;
      }
      res.json(deduction);
    } catch (error) {
      console.error('Error in updateDeduction:', error);
      res.status(500).json({ error: 'Failed to update deduction' });
    }
  }

  // Loan Record Methods
  async getAllLoanRecords(req: Request, res: Response): Promise<void> {
    try {
      const records = await this.payrollService.getAllLoanRecords();
      res.json(records);
    } catch (error) {
      console.error('Error in getAllLoanRecords:', error);
      res.status(500).json({ error: 'Failed to fetch loan records' });
    }
  }

  async getLoanRecordById(req: Request<{ id: string }>, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const record = await this.payrollService.getLoanRecordById(id);
      if (!record) {
        res.status(404).json({ error: 'Loan record not found' });
        return;
      }
      res.json(record);
    } catch (error) {
      console.error('Error in getLoanRecordById:', error);
      res.status(500).json({ error: 'Failed to fetch loan record' });
    }
  }

  async getLoanRecordsByPersonnel(req: Request<{ personnelId: string }>, res: Response): Promise<void> {
    try {
      const { personnelId } = req.params;
      const records = await this.payrollService.getLoanRecordsByPersonnel(personnelId);
      res.json(records);
    } catch (error) {
      console.error('Error in getLoanRecordsByPersonnel:', error);
      res.status(500).json({ error: 'Failed to fetch loan records' });
    }
  }

  async createLoanRecord(req: Request<{}, {}, CreateLoanRecordDto>, res: Response): Promise<void> {
    try {
      const data: CreateLoanRecordDto = req.body;
      const record = await this.payrollService.createLoanRecord(data);
      res.status(201).json(record);
    } catch (error) {
      console.error('Error in createLoanRecord:', error);
      res.status(500).json({ error: 'Failed to create loan record' });
    }
  }

  async updateLoanRecord(req: Request<{ id: string }, {}, UpdateLoanRecordDto>, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const data: UpdateLoanRecordDto = req.body;
      const record = await this.payrollService.updateLoanRecord(id, data);
      if (!record) {
        res.status(404).json({ error: 'Loan record not found' });
        return;
      }
      res.json(record);
    } catch (error) {
      console.error('Error in updateLoanRecord:', error);
      res.status(500).json({ error: 'Failed to update loan record' });
    }
  }

  async updateLoanBalance(req: Request<{ id: string }, {}, { amount: number }>, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { amount } = req.body;
      const record = await this.payrollService.updateLoanBalance(id, amount);
      if (!record) {
        res.status(404).json({ error: 'Loan record not found' });
        return;
      }
      res.json(record);
    } catch (error) {
      console.error('Error in updateLoanBalance:', error);
      res.status(500).json({ error: 'Failed to update loan balance' });
    }
  }
} 