import { Gender, CivilStatus, EmploymentType } from '@prisma/client';

export interface Personnel {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  dateOfBirth?: Date;
  gender?: Gender;
  civilStatus?: CivilStatus;
  contactNumber?: string;
  address?: string;
  departmentId?: string;
  designation?: string;
  employmentType: EmploymentType;
  dateHired?: Date;
  salary: number;
  gsisNumber?: string;
  pagibigNumber?: string;
  philhealthNumber?: string;
  sssNumber?: string;
  tinNumber?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreatePersonnelDto {
  userId: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  dateOfBirth?: Date;
  gender?: Gender;
  civilStatus?: CivilStatus;
  contactNumber?: string;
  address?: string;
  departmentId?: string;
  designation?: string;
  employmentType: EmploymentType;
  dateHired?: Date;
  salary: number;
  gsisNumber?: string;
  pagibigNumber?: string;
  philhealthNumber?: string;
  sssNumber?: string;
  tinNumber?: string;
}

export interface UpdatePersonnelDto {
  firstName?: string;
  lastName?: string;
  middleName?: string;
  dateOfBirth?: Date;
  gender?: Gender;
  civilStatus?: CivilStatus;
  contactNumber?: string;
  address?: string;
  departmentId?: string;
  designation?: string;
  employmentType?: EmploymentType;
  dateHired?: Date;
  salary?: number;
  gsisNumber?: string;
  pagibigNumber?: string;
  philhealthNumber?: string;
  sssNumber?: string;
  tinNumber?: string;
} 