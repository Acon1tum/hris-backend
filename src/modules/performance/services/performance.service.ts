import { PrismaClient, ReviewStatus, EvaluationStatus } from '@prisma/client';
import { 
  CreatePerformanceReviewDto, 
  UpdatePerformanceReviewDto,
  CreatePerformanceEvaluationDto,
  UpdatePerformanceEvaluationDto
} from '../types/performance.types';

export class PerformanceService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  // Performance Review Methods
  async getAllPerformanceReviews() {
    return this.prisma.performanceReview.findMany({
      include: {
        personnel: true,
        reviewer: true
      }
    });
  }

  async getPerformanceReviewById(id: string) {
    return this.prisma.performanceReview.findUnique({
      where: { id },
      include: {
        personnel: true,
        reviewer: true
      }
    });
  }

  async getPerformanceReviewsByPersonnel(personnelId: string) {
    return this.prisma.performanceReview.findMany({
      where: { personnel_id: personnelId },
      include: {
        personnel: true,
        reviewer: true
      }
    });
  }

  async createPerformanceReview(data: CreatePerformanceReviewDto) {
    return this.prisma.performanceReview.create({
      data: {
        ...data,
        status: data.status || ReviewStatus.Draft
      },
      include: {
        personnel: true,
        reviewer: true
      }
    });
  }

  async updatePerformanceReview(id: string, data: UpdatePerformanceReviewDto) {
    return this.prisma.performanceReview.update({
      where: { id },
      data,
      include: {
        personnel: true,
        reviewer: true
      }
    });
  }

  // Performance Evaluation Methods
  async getAllPerformanceEvaluations() {
    return this.prisma.performanceEvaluation.findMany({
      include: {
        personnel: true,
        reviewer: true
      }
    });
  }

  async getPerformanceEvaluationById(id: string) {
    return this.prisma.performanceEvaluation.findUnique({
      where: { id },
      include: {
        personnel: true,
        reviewer: true
      }
    });
  }

  async getPerformanceEvaluationsByPersonnel(personnelId: string) {
    return this.prisma.performanceEvaluation.findMany({
      where: { personnel_id: personnelId },
      include: {
        personnel: true,
        reviewer: true
      }
    });
  }

  async createPerformanceEvaluation(data: CreatePerformanceEvaluationDto) {
    return this.prisma.performanceEvaluation.create({
      data: {
        ...data,
        evaluation_date: new Date(),
        status: data.status || EvaluationStatus.Draft
      },
      include: {
        personnel: true,
        reviewer: true
      }
    });
  }

  async updatePerformanceEvaluation(id: string, data: UpdatePerformanceEvaluationDto) {
    return this.prisma.performanceEvaluation.update({
      where: { id },
      data,
      include: {
        personnel: true,
        reviewer: true
      }
    });
  }
} 