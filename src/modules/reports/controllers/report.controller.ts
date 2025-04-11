import { Request, Response } from 'express';
import { ReportServiceImpl } from '../services/report.service';
import { CreateReportDto, UpdateReportDto, ReportFilterDto } from '../types/report.types';

export class ReportController {
  private reportService: ReportServiceImpl;

  constructor() {
    this.reportService = new ReportServiceImpl();
  }

  getAllReports = async (req: Request, res: Response) => {
    try {
      const filter: ReportFilterDto = {
        generated_by: req.query.generated_by as string,
        start_date: req.query.start_date ? new Date(req.query.start_date as string) : undefined,
        end_date: req.query.end_date ? new Date(req.query.end_date as string) : undefined
      };
      const reports = await this.reportService.getAllReports(filter);
      res.json(reports);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  };

  getReportById = async (req: Request, res: Response) => {
    try {
      const report = await this.reportService.getReportById(req.params.id);
      res.json(report);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(404).json({ error: error.message });
      } else {
        res.status(404).json({ error: 'An unknown error occurred' });
      }
    }
  };

  createReport = async (req: Request, res: Response) => {
    try {
      const data: CreateReportDto = req.body;
      const report = await this.reportService.createReport(data);
      res.status(201).json(report);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: 'An unknown error occurred' });
      }
    }
  };

  updateReport = async (req: Request, res: Response) => {
    try {
      const data: UpdateReportDto = req.body;
      const report = await this.reportService.updateReport(req.params.id, data);
      res.json(report);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: 'An unknown error occurred' });
      }
    }
  };

  deleteReport = async (req: Request, res: Response) => {
    try {
      await this.reportService.deleteReport(req.params.id);
      res.status(204).send();
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: 'An unknown error occurred' });
      }
    }
  };

  generateReport = async (req: Request, res: Response) => {
    try {
      const parameters = req.body.parameters || {};
      const result = await this.reportService.generateReport(req.params.id, parameters);
      res.json(result);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: 'An unknown error occurred' });
      }
    }
  };
} 