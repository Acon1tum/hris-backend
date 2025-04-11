import { ReviewStatus, EvaluationStatus } from '@prisma/client';

export interface PerformanceReview {
  id: string;
  personnel_id: string;
  reviewer_id: string;
  review_period_start: Date;
  review_period_end: Date;
  review_date: Date;
  performance_score?: number;
  strengths?: string;
  areas_for_improvement?: string;
  goals?: string;
  status: ReviewStatus;
}

export interface PerformanceEvaluation {
  id: string;
  personnel_id: string;
  reviewer_id: string;
  evaluation_period_start: Date;
  evaluation_period_end: Date;
  evaluation_date: Date;
  self_assessment?: string;
  manager_comments?: string;
  peer_feedback?: string;
  kpi_score?: number;
  overall_performance_score?: number;
  strengths?: string;
  areas_for_improvement?: string;
  recommended_training?: string;
  status: EvaluationStatus;
}

export interface CreatePerformanceReviewDto {
  personnel_id: string;
  reviewer_id: string;
  review_period_start: Date;
  review_period_end: Date;
  review_date: Date;
  performance_score?: number;
  strengths?: string;
  areas_for_improvement?: string;
  goals?: string;
  status?: ReviewStatus;
}

export interface UpdatePerformanceReviewDto {
  performance_score?: number;
  strengths?: string;
  areas_for_improvement?: string;
  goals?: string;
  status?: ReviewStatus;
}

export interface CreatePerformanceEvaluationDto {
  personnel_id: string;
  reviewer_id: string;
  evaluation_period_start: Date;
  evaluation_period_end: Date;
  self_assessment?: string;
  manager_comments?: string;
  peer_feedback?: string;
  kpi_score?: number;
  overall_performance_score?: number;
  strengths?: string;
  areas_for_improvement?: string;
  recommended_training?: string;
  status?: EvaluationStatus;
}

export interface UpdatePerformanceEvaluationDto {
  self_assessment?: string;
  manager_comments?: string;
  peer_feedback?: string;
  kpi_score?: number;
  overall_performance_score?: number;
  strengths?: string;
  areas_for_improvement?: string;
  recommended_training?: string;
  status?: EvaluationStatus;
} 