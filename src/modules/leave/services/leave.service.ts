import { PrismaClient, ApprovalStatus } from '@prisma/client';
import {
  CreateLeaveApplicationDto,
  UpdateLeaveApplicationDto,
  CreateLeaveTypeDto,
  UpdateLeaveTypeDto,
  CreateLeaveBalanceDto,
  UpdateLeaveBalanceDto,
} from '../types/leave.types';

export class LeaveService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  // Leave Type Methods
  async getAllLeaveTypes() {
    try {
      return await this.prisma.leaveType.findMany();
    } catch (error) {
      console.error('Error in getAllLeaveTypes service:', error);
      throw error;
    }
  }

  async getLeaveTypeById(id: string) {
    try {
      return await this.prisma.leaveType.findUnique({
        where: { id },
      });
    } catch (error) {
      console.error('Error in getLeaveTypeById service:', error);
      throw error;
    }
  }

  async createLeaveType(data: CreateLeaveTypeDto) {
    try {
      return await this.prisma.leaveType.create({
        data: {
          leave_type_name: data.leave_type_name,
          description: data.description,
          max_days: data.max_days,
          requires_document: data.requires_document,
          is_active: data.is_active,
        },
      });
    } catch (error) {
      console.error('Error in createLeaveType service:', error);
      throw error;
    }
  }

  async updateLeaveType(id: string, data: UpdateLeaveTypeDto) {
    try {
      return await this.prisma.leaveType.update({
        where: { id },
        data: {
          leave_type_name: data.leave_type_name,
          description: data.description,
          max_days: data.max_days,
          requires_document: data.requires_document,
          is_active: data.is_active,
        },
      });
    } catch (error) {
      console.error('Error in updateLeaveType service:', error);
      throw error;
    }
  }

  async deleteLeaveType(id: string) {
    try {
      return await this.prisma.leaveType.delete({
        where: { id },
      });
    } catch (error) {
      console.error('Error in deleteLeaveType service:', error);
      throw error;
    }
  }

  // Leave Balance Methods
  async getAllLeaveBalances() {
    try {
      return await this.prisma.leaveBalance.findMany({
        include: {
          personnel: true,
          leave_type: true,
        },
      });
    } catch (error) {
      console.error('Error in getAllLeaveBalances service:', error);
      throw error;
    }
  }

  async getLeaveBalanceById(id: string) {
    try {
      return await this.prisma.leaveBalance.findUnique({
        where: { id },
        include: {
          personnel: true,
          leave_type: true,
        },
      });
    } catch (error) {
      console.error('Error in getLeaveBalanceById service:', error);
      throw error;
    }
  }

  async getLeaveBalancesByPersonnel(personnelId: string) {
    try {
      return await this.prisma.leaveBalance.findMany({
        where: { personnel_id: personnelId },
        include: {
          leave_type: true,
        },
      });
    } catch (error) {
      console.error('Error in getLeaveBalancesByPersonnel service:', error);
      throw error;
    }
  }

  async createLeaveBalance(data: CreateLeaveBalanceDto) {
    try {
      return await this.prisma.leaveBalance.create({
        data: {
          personnel_id: data.personnel_id,
          leave_type_id: data.leave_type_id,
          year: data.year,
          total_credits: data.total_credits,
          used_credits: 0,
          earned_credits: 0,
        },
        include: {
          personnel: true,
          leave_type: true,
        },
      });
    } catch (error) {
      console.error('Error in createLeaveBalance service:', error);
      throw error;
    }
  }

  async updateLeaveBalance(id: string, data: UpdateLeaveBalanceDto) {
    try {
      return await this.prisma.leaveBalance.update({
        where: { id },
        data: {
          total_credits: data.total_credits,
          used_credits: data.used_credits,
          earned_credits: data.earned_credits,
        },
        include: {
          personnel: true,
          leave_type: true,
        },
      });
    } catch (error) {
      console.error('Error in updateLeaveBalance service:', error);
      throw error;
    }
  }

  // Leave Application Methods
  async getAllLeaveApplications() {
    try {
      return await this.prisma.leaveApplication.findMany({
        include: {
          personnel: true,
          leave_type: true,
        },
      });
    } catch (error) {
      console.error('Error in getAllLeaveApplications service:', error);
      throw error;
    }
  }

  async getLeaveApplicationById(id: string) {
    try {
      return await this.prisma.leaveApplication.findUnique({
        where: { id },
        include: {
          personnel: true,
          leave_type: true,
        },
      });
    } catch (error) {
      console.error('Error in getLeaveApplicationById service:', error);
      throw error;
    }
  }

  async getLeaveApplicationsByPersonnel(personnelId: string) {
    try {
      return await this.prisma.leaveApplication.findMany({
        where: { personnel_id: personnelId },
        include: {
          leave_type: true,
        },
      });
    } catch (error) {
      console.error('Error in getLeaveApplicationsByPersonnel service:', error);
      throw error;
    }
  }

  async createLeaveApplication(data: CreateLeaveApplicationDto) {
    try {
      return await this.prisma.leaveApplication.create({
        data: {
          personnel_id: data.personnel_id,
          leave_type_id: data.leave_type_id,
          start_date: data.start_date,
          end_date: data.end_date,
          total_days: data.total_days,
          reason: data.reason,
          supporting_document: data.supporting_document,
          status: ApprovalStatus.Pending,
        },
        include: {
          personnel: true,
          leave_type: true,
        },
      });
    } catch (error) {
      console.error('Error in createLeaveApplication service:', error);
      throw error;
    }
  }

  async updateLeaveApplication(id: string, data: UpdateLeaveApplicationDto) {
    try {
      return await this.prisma.leaveApplication.update({
        where: { id },
        data: {
          start_date: data.start_date,
          end_date: data.end_date,
          total_days: data.total_days,
          reason: data.reason,
          supporting_document: data.supporting_document,
          status: data.status,
        },
        include: {
          personnel: true,
          leave_type: true,
        },
      });
    } catch (error) {
      console.error('Error in updateLeaveApplication service:', error);
      throw error;
    }
  }

  async approveLeaveApplication(id: string) {
    try {
      return await this.prisma.leaveApplication.update({
        where: { id },
        data: {
          status: ApprovalStatus.Approved,
        },
        include: {
          personnel: true,
          leave_type: true,
        },
      });
    } catch (error) {
      console.error('Error in approveLeaveApplication service:', error);
      throw error;
    }
  }

  async rejectLeaveApplication(id: string) {
    try {
      return await this.prisma.leaveApplication.update({
        where: { id },
        data: {
          status: ApprovalStatus.Rejected,
        },
        include: {
          personnel: true,
          leave_type: true,
        },
      });
    } catch (error) {
      console.error('Error in rejectLeaveApplication service:', error);
      throw error;
    }
  }

  async cancelLeaveApplication(id: string) {
    try {
      return await this.prisma.leaveApplication.update({
        where: { id },
        data: {
          status: ApprovalStatus.Rejected,
        },
        include: {
          personnel: true,
          leave_type: true,
        },
      });
    } catch (error) {
      console.error('Error in cancelLeaveApplication service:', error);
      throw error;
    }
  }
} 