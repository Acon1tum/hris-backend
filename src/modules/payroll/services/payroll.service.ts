import { PrismaClient, PaymentStatus, LoanStatus } from '@prisma/client';
import {
  CreatePayrollRecordDto,
  UpdatePayrollRecordDto,
  CreateDeductionDto,
  UpdateDeductionDto,
  CreateLoanRecordDto,
  UpdateLoanRecordDto,
} from '../types/payroll.types';

export class PayrollService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  // Payroll Record Methods
  async getAllPayrollRecords() {
    return this.prisma.payrollRecord.findMany({
      include: {
        deductions: true,
        personnel: true,
      },
    });
  }

  async getPayrollRecordById(id: string) {
    return this.prisma.payrollRecord.findUnique({
      where: { id },
      include: {
        deductions: true,
        personnel: true,
      },
    });
  }

  async getPayrollRecordsByPersonnel(personnelId: string) {
    return this.prisma.payrollRecord.findMany({
      where: { personnel_id: personnelId },
      include: {
        deductions: true,
        personnel: true,
      },
    });
  }

  async createPayrollRecord(data: CreatePayrollRecordDto) {
    const grossSalary = data.basic_salary + (data.salary_adjustments || 0);
    
    return this.prisma.payrollRecord.create({
      data: {
        ...data,
        gross_salary: grossSalary,
        total_deductions: 0,
        net_amount_due: grossSalary,
        payment_status: PaymentStatus.Pending,
        processed_date: new Date(),
      },
      include: {
        deductions: true,
        personnel: true,
      },
    });
  }

  async updatePayrollRecord(id: string, data: UpdatePayrollRecordDto) {
    const record = await this.prisma.payrollRecord.findUnique({
      where: { id },
      include: { deductions: true },
    });

    if (!record) {
      return null;
    }

    const grossSalary = (data.basic_salary || record.basic_salary) + 
                       (data.salary_adjustments || record.salary_adjustments || 0);
    const totalDeductions = record.deductions.reduce((sum, deduction) => 
      sum + deduction.bir + deduction.pagibig + deduction.philhealth + 
      deduction.sss + deduction.loans + deduction.other_deductions, 0);

    return this.prisma.payrollRecord.update({
      where: { id },
      data: {
        ...data,
        gross_salary: grossSalary,
        net_amount_due: grossSalary - totalDeductions,
      },
      include: {
        deductions: true,
        personnel: true,
      },
    });
  }

  // Deduction Methods
  async createDeduction(data: CreateDeductionDto) {
    const deduction = await this.prisma.deduction.create({
      data,
    });

    // Update payroll record totals
    await this.updatePayrollRecord(data.payroll_id, {});

    return deduction;
  }

  async updateDeduction(id: string, data: UpdateDeductionDto) {
    const deduction = await this.prisma.deduction.update({
      where: { id },
      data,
    });

    // Update payroll record totals
    await this.updatePayrollRecord(deduction.payroll_id, {});

    return deduction;
  }

  // Loan Record Methods
  async getAllLoanRecords() {
    return this.prisma.loanRecord.findMany({
      include: {
        personnel: true,
      },
    });
  }

  async getLoanRecordById(id: string) {
    return this.prisma.loanRecord.findUnique({
      where: { id },
      include: {
        personnel: true,
      },
    });
  }

  async getLoanRecordsByPersonnel(personnelId: string) {
    return this.prisma.loanRecord.findMany({
      where: { personnel_id: personnelId },
      include: {
        personnel: true,
      },
    });
  }

  async createLoanRecord(data: CreateLoanRecordDto) {
    return this.prisma.loanRecord.create({
      data: {
        ...data,
        remaining_balance: data.loan_amount,
        status: LoanStatus.Active,
        created_at: new Date(),
      },
      include: {
        personnel: true,
      },
    });
  }

  async updateLoanRecord(id: string, data: UpdateLoanRecordDto) {
    return this.prisma.loanRecord.update({
      where: { id },
      data,
      include: {
        personnel: true,
      },
    });
  }

  async updateLoanBalance(id: string, amount: number) {
    const loan = await this.prisma.loanRecord.findUnique({
      where: { id },
    });

    if (!loan) {
      return null;
    }

    const newBalance = loan.remaining_balance - amount;
    const status = newBalance <= 0 ? LoanStatus.Fully_Paid : LoanStatus.Active;

    return this.prisma.loanRecord.update({
      where: { id },
      data: {
        remaining_balance: newBalance,
        status,
      },
      include: {
        personnel: true,
      },
    });
  }
} 