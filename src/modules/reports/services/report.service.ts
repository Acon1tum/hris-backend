import { PrismaClient, Report } from '@prisma/client';
import { ReportDto, CreateReportDto, UpdateReportDto, ReportFilterDto, ReportService } from '../types/report.types';

export class ReportServiceImpl implements ReportService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async getAllReports(filter?: ReportFilterDto): Promise<ReportDto[]> {
    try {
      const where = this.buildFilterWhereClause(filter);
      const reports = await this.prisma.report.findMany({
        where,
        orderBy: { created_at: 'desc' }
      });
      return reports.map(this.mapToDto);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch reports: ${error.message}`);
      }
      throw new Error('Failed to fetch reports: Unknown error');
    }
  }

  async getReportById(id: string): Promise<ReportDto> {
    try {
      const report = await this.prisma.report.findUnique({
        where: { id }
      });
      if (!report) {
        throw new Error('Report not found');
      }
      return this.mapToDto(report);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch report: ${error.message}`);
      }
      throw new Error('Failed to fetch report: Unknown error');
    }
  }

  async createReport(data: CreateReportDto): Promise<ReportDto> {
    try {
      const report = await this.prisma.report.create({
        data: {
          report_name: data.title,
          generated_by: 'system', // TODO: Replace with actual user ID from auth context
          file_path: data.file_path || '',
          created_at: new Date()
        }
      });
      return this.mapToDto(report);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Failed to create report: ${error.message}`);
      }
      throw new Error('Failed to create report: Unknown error');
    }
  }

  async updateReport(id: string, data: UpdateReportDto): Promise<ReportDto> {
    try {
      const report = await this.prisma.report.update({
        where: { id },
        data: {
          report_name: data.title,
          file_path: data.file_path,
          digital_signature: data.digital_signature
        }
      });
      return this.mapToDto(report);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Failed to update report: ${error.message}`);
      }
      throw new Error('Failed to update report: Unknown error');
    }
  }

  async deleteReport(id: string): Promise<void> {
    try {
      await this.prisma.report.delete({
        where: { id }
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Failed to delete report: ${error.message}`);
      }
      throw new Error('Failed to delete report: Unknown error');
    }
  }

  async generateReport(id: string, parameters?: Record<string, any>): Promise<any> {
    try {
      const report = await this.getReportById(id);
      // TODO: Implement report generation logic based on report_type
      return {
        report,
        parameters,
        generated_at: new Date()
      };
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Failed to generate report: ${error.message}`);
      }
      throw new Error('Failed to generate report: Unknown error');
    }
  }

  private buildFilterWhereClause(filter?: ReportFilterDto) {
    const where: any = {};
    if (filter?.generated_by) {
      where.generated_by = filter.generated_by;
    }
    if (filter?.start_date || filter?.end_date) {
      where.created_at = {};
      if (filter.start_date) {
        where.created_at.gte = filter.start_date;
      }
      if (filter.end_date) {
        where.created_at.lte = filter.end_date;
      }
    }
    return where;
  }

  private mapToDto(report: Report): ReportDto {
    return {
      id: report.id,
      title: report.report_name,
      report_name: report.report_name,
      generated_by: report.generated_by,
      file_path: report.file_path,
      digital_signature: report.digital_signature,
      created_at: report.created_at
    };
  }
} 