import { Personnel } from '@prisma/client';

export interface EmployeeSelfServiceProfile {
  id: string;
  personnelId: string;
  personnel: Personnel;
  profilePicture: string | null;
  bio: string | null;
  skills: string[];
  certifications: string[];
  education: Education[];
  workExperience: WorkExperience[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Education {
  id: string;
  profileId: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: Date;
  endDate: Date | null;
  isCurrent: boolean;
  description: string | null;
}

export interface WorkExperience {
  id: string;
  profileId: string;
  company: string;
  position: string;
  startDate: Date;
  endDate: Date | null;
  isCurrent: boolean;
  description: string | null;
}

export interface CreateEmployeeSelfServiceProfileDto {
  personnelId: string;
  profilePicture?: string | null;
  bio?: string | null;
  skills?: string[];
  certifications?: string[];
  education?: Omit<Education, 'id' | 'profileId'>[];
  workExperience?: Omit<WorkExperience, 'id' | 'profileId'>[];
}

export interface UpdateEmployeeSelfServiceProfileDto {
  profilePicture?: string | null;
  bio?: string | null;
  skills?: string[];
  certifications?: string[];
  education?: Omit<Education, 'id' | 'profileId'>[];
  workExperience?: Omit<WorkExperience, 'id' | 'profileId'>[];
}

export interface EmployeeDocument {
  id: string;
  personnelId: string;
  title: string;
  description: string | null;
  fileUrl: string;
  fileType: string;
  fileSize: number;
  category: string;
  isPrivate: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateEmployeeDocumentDto {
  personnelId: string;
  title: string;
  description?: string | null;
  fileUrl: string;
  fileType: string;
  fileSize: number;
  category: string;
  isPrivate: boolean;
}

export interface UpdateEmployeeDocumentDto {
  title?: string;
  description?: string | null;
  fileUrl?: string;
  fileType?: string;
  fileSize?: number;
  category?: string;
  isPrivate?: boolean;
} 