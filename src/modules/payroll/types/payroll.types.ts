import { PaymentStatus, LoanType, LoanStatus } from '@prisma/client';

export interface PayrollRecord {
  id: string;
  personnel_id: string;
  payroll_period_start: Date;
  payroll_period_end: Date;
  basic_salary: number;
  salary_adjustments: number;
  gross_salary: number;
  total_deductions: number;
  net_amount_due: number;
  payment_status: PaymentStatus;
  bank_account_number?: string;
  processed_date: Date;
  processed_by?: string;
  deductions: Deduction[];
}

export interface Deduction {
  id: string;
  personnel_id: string;
  payroll_id: string;
  bir: number;
  pagibig: number;
  philhealth: number;
  sss: number;
  loans: number;
  other_deductions: number;
}

export interface LoanRecord {
  id: string;
  personnel_id: string;
  loan_type: LoanType;
  loan_source: string;
  loan_amount: number;
  monthly_deduction: number;
  start_date: Date;
  end_date?: Date;
  remaining_balance: number;
  status: LoanStatus;
  created_at: Date;
}

export interface CreatePayrollRecordDto {
  personnel_id: string;
  payroll_period_start: Date;
  payroll_period_end: Date;
  basic_salary: number;
  salary_adjustments?: number;
  bank_account_number?: string;
}

export interface UpdatePayrollRecordDto {
  basic_salary?: number;
  salary_adjustments?: number;
  bank_account_number?: string;
  payment_status?: PaymentStatus;
}

export interface CreateDeductionDto {
  personnel_id: string;
  payroll_id: string;
  bir?: number;
  pagibig?: number;
  philhealth?: number;
  sss?: number;
  loans?: number;
  other_deductions?: number;
}

export interface UpdateDeductionDto {
  bir?: number;
  pagibig?: number;
  philhealth?: number;
  sss?: number;
  loans?: number;
  other_deductions?: number;
}

export interface CreateLoanRecordDto {
  personnel_id: string;
  loan_type: LoanType;
  loan_source: string;
  loan_amount: number;
  monthly_deduction: number;
  start_date: Date;
  end_date?: Date;
}

export interface UpdateLoanRecordDto {
  loan_type?: LoanType;
  loan_source?: string;
  loan_amount?: number;
  monthly_deduction?: number;
  end_date?: Date;
  status?: LoanStatus;
} 