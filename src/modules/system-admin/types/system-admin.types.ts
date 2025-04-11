import { Role, Status } from '@prisma/client';

export interface SystemSettingDto {
  id: string;
  setting_key: string;
  setting_value: string;
}

export interface CreateSystemSettingDto {
  setting_key: string;
  setting_value: string;
}

export interface UpdateSystemSettingDto {
  setting_value?: string;
}

export interface UserDto {
  id: string;
  username: string;
  email: string;
  role: Role;
  status: Status;
  created_at: Date;
  updated_at: Date;
}

export interface CreateUserDto {
  username: string;
  password: string;
  email: string;
  role: Role;
}

export interface UpdateUserDto {
  username?: string;
  password?: string;
  email?: string;
  role?: Role;
  status?: Status;
}

export interface AuditLogDto {
  id: string;
  user_id: string;
  action_type: string;
  table_affected: string;
  record_id: string;
  action_details?: string;
  ip_address?: string;
  user_agent?: string;
  timestamp: Date;
}

export interface AuditLogFilterDto {
  user_id?: string;
  action_type?: string;
  table_affected?: string;
  start_date?: Date;
  end_date?: Date;
}

export interface SystemAdminService {
  // System Settings
  getAllSettings(): Promise<SystemSettingDto[]>;
  getSettingByKey(key: string): Promise<SystemSettingDto>;
  createSetting(data: CreateSystemSettingDto): Promise<SystemSettingDto>;
  updateSetting(key: string, data: UpdateSystemSettingDto): Promise<SystemSettingDto>;
  deleteSetting(key: string): Promise<void>;

  // User Management
  getAllUsers(): Promise<UserDto[]>;
  getUserById(id: string): Promise<UserDto>;
  createUser(data: CreateUserDto): Promise<UserDto>;
  updateUser(id: string, data: UpdateUserDto): Promise<UserDto>;
  deleteUser(id: string): Promise<void>;
  changeUserStatus(id: string, status: Status): Promise<UserDto>;

  // Audit Logs
  getAllAuditLogs(filter?: AuditLogFilterDto): Promise<AuditLogDto[]>;
  getAuditLogById(id: string): Promise<AuditLogDto>;
  createAuditLog(data: Partial<AuditLogDto>): Promise<AuditLogDto>;
} 