import { Request, Response } from 'express';
import { SystemAdminServiceImpl } from '../services/system-admin.service';
import { CreateSystemSettingDto, UpdateSystemSettingDto, CreateUserDto, UpdateUserDto, AuditLogFilterDto } from '../types/system-admin.types';
import { Status } from '@prisma/client';

export class SystemAdminController {
  private systemAdminService: SystemAdminServiceImpl;

  constructor() {
    this.systemAdminService = new SystemAdminServiceImpl();
  }

  // System Settings
  async getAllSettings(req: Request, res: Response) {
    try {
      const settings = await this.systemAdminService.getAllSettings();
      res.json(settings);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  }

  async getSettingByKey(req: Request, res: Response) {
    try {
      const { key } = req.params;
      const setting = await this.systemAdminService.getSettingByKey(key);
      res.json(setting);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  }

  async createSetting(req: Request, res: Response) {
    try {
      const data: CreateSystemSettingDto = req.body;
      const setting = await this.systemAdminService.createSetting(data);
      res.status(201).json(setting);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  }

  async updateSetting(req: Request, res: Response) {
    try {
      const { key } = req.params;
      const data: UpdateSystemSettingDto = req.body;
      const setting = await this.systemAdminService.updateSetting(key, data);
      res.json(setting);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  }

  async deleteSetting(req: Request, res: Response) {
    try {
      const { key } = req.params;
      await this.systemAdminService.deleteSetting(key);
      res.status(204).send();
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  }

  // User Management
  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await this.systemAdminService.getAllUsers();
      res.json(users);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  }

  async getUserById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await this.systemAdminService.getUserById(id);
      res.json(user);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  }

  async createUser(req: Request, res: Response) {
    try {
      const data: CreateUserDto = req.body;
      const user = await this.systemAdminService.createUser(data);
      res.status(201).json(user);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data: UpdateUserDto = req.body;
      const user = await this.systemAdminService.updateUser(id, data);
      res.json(user);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await this.systemAdminService.deleteUser(id);
      res.status(204).send();
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  }

  async changeUserStatus(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const user = await this.systemAdminService.changeUserStatus(id, status as Status);
      res.json(user);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  }

  // Audit Logs
  async getAllAuditLogs(req: Request, res: Response) {
    try {
      const filter: AuditLogFilterDto = req.query as any;
      const logs = await this.systemAdminService.getAllAuditLogs(filter);
      res.json(logs);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  }

  async getAuditLogById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const log = await this.systemAdminService.getAuditLogById(id);
      res.json(log);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  }

  async createAuditLog(req: Request, res: Response) {
    try {
      const data = req.body;
      const log = await this.systemAdminService.createAuditLog(data);
      res.status(201).json(log);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  }
} 