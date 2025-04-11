import { PrismaClient, Role, Status, User, SystemSetting, AuditLog } from '@prisma/client';
import { SystemAdminService, SystemSettingDto, CreateSystemSettingDto, UpdateSystemSettingDto, UserDto, CreateUserDto, UpdateUserDto, AuditLogDto, AuditLogFilterDto } from '../types/system-admin.types';
import * as bcrypt from 'bcryptjs';

export class SystemAdminServiceImpl implements SystemAdminService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  // System Settings
  async getAllSettings(): Promise<SystemSettingDto[]> {
    try {
      const settings = await this.prisma.systemSetting.findMany();
      return settings.map(this.mapSystemSettingToDto);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch settings: ${error.message}`);
      }
      throw new Error('Failed to fetch settings: Unknown error');
    }
  }

  async getSettingByKey(key: string): Promise<SystemSettingDto> {
    try {
      const setting = await this.prisma.systemSetting.findUnique({
        where: { setting_key: key }
      });
      if (!setting) {
        throw new Error('Setting not found');
      }
      return this.mapSystemSettingToDto(setting);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch setting: ${error.message}`);
      }
      throw new Error('Failed to fetch setting: Unknown error');
    }
  }

  async createSetting(data: CreateSystemSettingDto): Promise<SystemSettingDto> {
    try {
      const setting = await this.prisma.systemSetting.create({
        data
      });
      return this.mapSystemSettingToDto(setting);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Failed to create setting: ${error.message}`);
      }
      throw new Error('Failed to create setting: Unknown error');
    }
  }

  async updateSetting(key: string, data: UpdateSystemSettingDto): Promise<SystemSettingDto> {
    try {
      const setting = await this.prisma.systemSetting.update({
        where: { setting_key: key },
        data
      });
      return this.mapSystemSettingToDto(setting);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Failed to update setting: ${error.message}`);
      }
      throw new Error('Failed to update setting: Unknown error');
    }
  }

  async deleteSetting(key: string): Promise<void> {
    try {
      await this.prisma.systemSetting.delete({
        where: { setting_key: key }
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Failed to delete setting: ${error.message}`);
      }
      throw new Error('Failed to delete setting: Unknown error');
    }
  }

  // User Management
  async getAllUsers(): Promise<UserDto[]> {
    try {
      const users = await this.prisma.user.findMany();
      return users.map(this.mapUserToDto);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch users: ${error.message}`);
      }
      throw new Error('Failed to fetch users: Unknown error');
    }
  }

  async getUserById(id: string): Promise<UserDto> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id }
      });
      if (!user) {
        throw new Error('User not found');
      }
      return this.mapUserToDto(user);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch user: ${error.message}`);
      }
      throw new Error('Failed to fetch user: Unknown error');
    }
  }

  async createUser(data: CreateUserDto): Promise<UserDto> {
    try {
      const hashedPassword = await bcrypt.hash(data.password, 10);
      const user = await this.prisma.user.create({
        data: {
          ...data,
          password_hash: hashedPassword,
          status: Status.Active
        }
      });
      return this.mapUserToDto(user);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Failed to create user: ${error.message}`);
      }
      throw new Error('Failed to create user: Unknown error');
    }
  }

  async updateUser(id: string, data: UpdateUserDto): Promise<UserDto> {
    try {
      const updateData: any = { ...data };
      if (data.password) {
        updateData.password_hash = await bcrypt.hash(data.password, 10);
        delete updateData.password;
      }
      const user = await this.prisma.user.update({
        where: { id },
        data: updateData
      });
      return this.mapUserToDto(user);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Failed to update user: ${error.message}`);
      }
      throw new Error('Failed to update user: Unknown error');
    }
  }

  async deleteUser(id: string): Promise<void> {
    try {
      await this.prisma.user.delete({
        where: { id }
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Failed to delete user: ${error.message}`);
      }
      throw new Error('Failed to delete user: Unknown error');
    }
  }

  async changeUserStatus(id: string, status: Status): Promise<UserDto> {
    try {
      const user = await this.prisma.user.update({
        where: { id },
        data: { status }
      });
      return this.mapUserToDto(user);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Failed to change user status: ${error.message}`);
      }
      throw new Error('Failed to change user status: Unknown error');
    }
  }

  // Audit Logs
  async getAllAuditLogs(filter?: AuditLogFilterDto): Promise<AuditLogDto[]> {
    try {
      const where = this.buildAuditLogFilterWhereClause(filter);
      const logs = await this.prisma.auditLog.findMany({
        where,
        orderBy: { timestamp: 'desc' }
      });
      return logs.map(this.mapAuditLogToDto);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch audit logs: ${error.message}`);
      }
      throw new Error('Failed to fetch audit logs: Unknown error');
    }
  }

  async getAuditLogById(id: string): Promise<AuditLogDto> {
    try {
      const log = await this.prisma.auditLog.findUnique({
        where: { id }
      });
      if (!log) {
        throw new Error('Audit log not found');
      }
      return this.mapAuditLogToDto(log);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch audit log: ${error.message}`);
      }
      throw new Error('Failed to fetch audit log: Unknown error');
    }
  }

  async createAuditLog(data: Partial<AuditLogDto>): Promise<AuditLogDto> {
    try {
      const log = await this.prisma.auditLog.create({
        data: {
          ...data,
          timestamp: new Date()
        } as any
      });
      return this.mapAuditLogToDto(log);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Failed to create audit log: ${error.message}`);
      }
      throw new Error('Failed to create audit log: Unknown error');
    }
  }

  private buildAuditLogFilterWhereClause(filter?: AuditLogFilterDto) {
    const where: any = {};
    if (filter?.user_id) {
      where.user_id = filter.user_id;
    }
    if (filter?.action_type) {
      where.action_type = filter.action_type;
    }
    if (filter?.table_affected) {
      where.table_affected = filter.table_affected;
    }
    if (filter?.start_date || filter?.end_date) {
      where.timestamp = {};
      if (filter.start_date) {
        where.timestamp.gte = filter.start_date;
      }
      if (filter.end_date) {
        where.timestamp.lte = filter.end_date;
      }
    }
    return where;
  }

  private mapSystemSettingToDto(setting: SystemSetting): SystemSettingDto {
    return {
      id: setting.id,
      setting_key: setting.setting_key,
      setting_value: setting.setting_value
    };
  }

  private mapUserToDto(user: User): UserDto {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      status: user.status,
      created_at: user.created_at,
      updated_at: user.updated_at
    };
  }

  private mapAuditLogToDto(log: AuditLog): AuditLogDto {
    return {
      id: log.id,
      user_id: log.user_id,
      action_type: log.action_type,
      table_affected: log.table_affected,
      record_id: log.record_id,
      action_details: log.action_details || undefined,
      ip_address: log.ip_address || undefined,
      user_agent: log.user_agent || undefined,
      timestamp: log.timestamp
    };
  }
} 