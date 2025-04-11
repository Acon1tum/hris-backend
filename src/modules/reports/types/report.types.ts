import { Report } from '@prisma/client';

export interface ReportDto {
  id: string;
  title: string;
  report_name: string;
  generated_by: string;
  file_path: string;
  digital_signature: string | null;
  created_at: Date;
}

export interface CreateReportDto {
  title: string;
  file_path?: string;
}

export interface UpdateReportDto {
  title?: string;
  file_path?: string;
  digital_signature?: string;
}

export interface ReportFilterDto {
  generated_by?: string;
  start_date?: Date;
  end_date?: Date;
}

export interface ReportService {
  getAllReports(filter?: ReportFilterDto): Promise<ReportDto[]>;
  getReportById(id: string): Promise<ReportDto>;
  createReport(data: CreateReportDto): Promise<ReportDto>;
  updateReport(id: string, data: UpdateReportDto): Promise<ReportDto>;
  deleteReport(id: string): Promise<void>;
  generateReport(id: string, parameters?: Record<string, any>): Promise<any>;
} 