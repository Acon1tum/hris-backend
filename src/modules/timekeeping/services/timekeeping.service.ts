import { PrismaClient, AttendanceLog, DtrAdjustmentRequest, AttendanceStatus, ApprovalStatus } from '@prisma/client';
import { 
  CreateAttendanceLogDto, 
  UpdateAttendanceLogDto,
  CreateDtrAdjustmentRequestDto,
  UpdateDtrAdjustmentRequestDto
} from '../types/timekeeping.types';

export class TimekeepingService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  // Attendance Log Methods
  async getAllAttendanceLogs(): Promise<AttendanceLog[]> {
    try {
      return await this.prisma.attendanceLog.findMany({
        include: {
          personnel: true,
        },
      });
    } catch (error) {
      console.error('Error in getAllAttendanceLogs service:', error);
      throw error;
    }
  }

  async getAttendanceLogById(id: string): Promise<AttendanceLog | null> {
    try {
      return await this.prisma.attendanceLog.findUnique({
        where: { id },
        include: {
          personnel: true,
        },
      });
    } catch (error) {
      console.error('Error in getAttendanceLogById service:', error);
      throw error;
    }
  }

  async createAttendanceLog(data: CreateAttendanceLogDto): Promise<AttendanceLog> {
    try {
      const prismaData = {
        personnel_id: data.personnelId,
        log_date: data.logDate,
        time_in: data.timeIn,
        time_out: data.timeOut,
        total_hours: data.totalHours,
        status: data.status,
        biometric_used: data.biometricUsed ?? true,
        evidence_path: data.evidencePath,
      };

      return await this.prisma.attendanceLog.create({
        data: prismaData,
        include: {
          personnel: true,
        },
      });
    } catch (error) {
      console.error('Error in createAttendanceLog service:', error);
      throw error;
    }
  }

  async updateAttendanceLog(id: string, data: UpdateAttendanceLogDto): Promise<AttendanceLog | null> {
    try {
      const prismaData = {
        time_in: data.timeIn,
        time_out: data.timeOut,
        total_hours: data.totalHours,
        status: data.status,
        biometric_used: data.biometricUsed,
        evidence_path: data.evidencePath,
      };

      return await this.prisma.attendanceLog.update({
        where: { id },
        data: prismaData,
        include: {
          personnel: true,
        },
      });
    } catch (error) {
      console.error('Error in updateAttendanceLog service:', error);
      throw error;
    }
  }

  // DTR Adjustment Request Methods
  async getAllDtrAdjustmentRequests(): Promise<DtrAdjustmentRequest[]> {
    try {
      return await this.prisma.dtrAdjustmentRequest.findMany({
        include: {
          personnel: true,
          approved_by_user: true,
        },
      });
    } catch (error) {
      console.error('Error in getAllDtrAdjustmentRequests service:', error);
      throw error;
    }
  }

  async getDtrAdjustmentRequestById(id: string): Promise<DtrAdjustmentRequest | null> {
    try {
      return await this.prisma.dtrAdjustmentRequest.findUnique({
        where: { id },
        include: {
          personnel: true,
          approved_by_user: true,
        },
      });
    } catch (error) {
      console.error('Error in getDtrAdjustmentRequestById service:', error);
      throw error;
    }
  }

  async createDtrAdjustmentRequest(data: CreateDtrAdjustmentRequestDto): Promise<DtrAdjustmentRequest> {
    try {
      const prismaData = {
        personnel_id: data.personnelId,
        log_date: data.logDate,
        original_time_in: data.originalTimeIn,
        original_time_out: data.originalTimeOut,
        requested_time_in: data.requestedTimeIn,
        requested_time_out: data.requestedTimeOut,
        reason: data.reason,
        supporting_document: data.supportingDocument,
        status: ApprovalStatus.Pending,
        request_date: new Date(),
      };

      return await this.prisma.dtrAdjustmentRequest.create({
        data: prismaData,
        include: {
          personnel: true,
          approved_by_user: true,
        },
      });
    } catch (error) {
      console.error('Error in createDtrAdjustmentRequest service:', error);
      throw error;
    }
  }

  async updateDtrAdjustmentRequest(id: string, data: UpdateDtrAdjustmentRequestDto): Promise<DtrAdjustmentRequest | null> {
    try {
      const prismaData = {
        requested_time_in: data.requestedTimeIn,
        requested_time_out: data.requestedTimeOut,
        reason: data.reason,
        supporting_document: data.supportingDocument,
        status: data.status,
        approval_date: data.approvalDate,
      };

      return await this.prisma.dtrAdjustmentRequest.update({
        where: { id },
        data: prismaData,
        include: {
          personnel: true,
          approved_by_user: true,
        },
      });
    } catch (error) {
      console.error('Error in updateDtrAdjustmentRequest service:', error);
      throw error;
    }
  }

  async approveDtrAdjustmentRequest(id: string, approvedBy: string): Promise<DtrAdjustmentRequest | null> {
    try {
      return await this.prisma.dtrAdjustmentRequest.update({
        where: { id },
        data: {
          status: ApprovalStatus.Approved,
          approved_by: approvedBy,
          approval_date: new Date(),
        },
        include: {
          personnel: true,
          approved_by_user: true,
        },
      });
    } catch (error) {
      console.error('Error in approveDtrAdjustmentRequest service:', error);
      throw error;
    }
  }

  async rejectDtrAdjustmentRequest(id: string, approvedBy: string): Promise<DtrAdjustmentRequest | null> {
    try {
      return await this.prisma.dtrAdjustmentRequest.update({
        where: { id },
        data: {
          status: ApprovalStatus.Rejected,
          approved_by: approvedBy,
          approval_date: new Date(),
        },
        include: {
          personnel: true,
          approved_by_user: true,
        },
      });
    } catch (error) {
      console.error('Error in rejectDtrAdjustmentRequest service:', error);
      throw error;
    }
  }
} 