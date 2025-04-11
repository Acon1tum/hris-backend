import { AttendanceStatus, ApprovalStatus } from '@prisma/client';

export interface AttendanceLog {
  id: string;
  personnelId: string;
  logDate: Date;
  timeIn?: Date;
  timeOut?: Date;
  totalHours?: number;
  status: AttendanceStatus;
  biometricUsed: boolean;
  evidencePath?: string;
}

export interface CreateAttendanceLogDto {
  personnelId: string;
  logDate: Date;
  timeIn?: Date;
  timeOut?: Date;
  totalHours?: number;
  status: AttendanceStatus;
  biometricUsed?: boolean;
  evidencePath?: string;
}

export interface UpdateAttendanceLogDto {
  timeIn?: Date;
  timeOut?: Date;
  totalHours?: number;
  status?: AttendanceStatus;
  biometricUsed?: boolean;
  evidencePath?: string;
}

export interface DtrAdjustmentRequest {
  id: string;
  personnelId: string;
  logDate: Date;
  originalTimeIn?: Date;
  originalTimeOut?: Date;
  requestedTimeIn?: Date;
  requestedTimeOut?: Date;
  reason: string;
  supportingDocument?: string;
  status: ApprovalStatus;
  requestDate: Date;
  approvedBy: string;
  approvalDate?: Date;
}

export interface CreateDtrAdjustmentRequestDto {
  personnelId: string;
  logDate: Date;
  originalTimeIn?: Date;
  originalTimeOut?: Date;
  requestedTimeIn?: Date;
  requestedTimeOut?: Date;
  reason: string;
  supportingDocument?: string;
}

export interface UpdateDtrAdjustmentRequestDto {
  requestedTimeIn?: Date;
  requestedTimeOut?: Date;
  reason?: string;
  supportingDocument?: string;
  status?: ApprovalStatus;
  approvalDate?: Date;
} 