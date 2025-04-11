import { ApprovalStatus } from '@prisma/client';

export interface LeaveApplication {
  id: string;
  personnel_id: string;
  leave_type_id: string;
  start_date: Date;
  end_date: Date;
  total_days: number;
  reason: string;
  supporting_document?: string;
  status: ApprovalStatus;
  created_at: Date;
  updated_at: Date;
}

export interface LeaveType {
  id: string;
  leave_type_name: string;
  description?: string;
  max_days: number;
  requires_document: boolean;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface LeaveBalance {
  id: string;
  personnel_id: string;
  leave_type_id: string;
  year: string;
  total_credits: number;
  used_credits: number;
  earned_credits: number;
  created_at: Date;
  updated_at: Date;
}

export interface CreateLeaveApplicationDto {
  personnel_id: string;
  leave_type_id: string;
  start_date: Date;
  end_date: Date;
  total_days: number;
  reason: string;
  supporting_document?: string;
}

export interface UpdateLeaveApplicationDto {
  start_date?: Date;
  end_date?: Date;
  total_days?: number;
  reason?: string;
  supporting_document?: string;
  status?: ApprovalStatus;
}

export interface CreateLeaveTypeDto {
  leave_type_name: string;
  description?: string;
  max_days: number;
  requires_document: boolean;
  is_active: boolean;
}

export interface UpdateLeaveTypeDto {
  leave_type_name?: string;
  description?: string;
  max_days?: number;
  requires_document?: boolean;
  is_active?: boolean;
}

export interface CreateLeaveBalanceDto {
  personnel_id: string;
  leave_type_id: string;
  year: string;
  total_credits: number;
}

export interface UpdateLeaveBalanceDto {
  total_credits?: number;
  used_credits?: number;
  earned_credits?: number;
} 