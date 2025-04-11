import { Request, Response } from 'express';
import { PerformanceService } from '../services/performance.service';
import { 
  CreatePerformanceReviewDto, 
  UpdatePerformanceReviewDto,
  CreatePerformanceEvaluationDto,
  UpdatePerformanceEvaluationDto
} from '../types/performance.types';

export class PerformanceController {
  private performanceService: PerformanceService;

  constructor() {
    this.performanceService = new PerformanceService();
  }

  // Performance Review Methods
  async getAllPerformanceReviews(req: Request, res: Response) {
    try {
      const reviews = await this.performanceService.getAllPerformanceReviews();
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch performance reviews' });
    }
  }

  async getPerformanceReviewById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const review = await this.performanceService.getPerformanceReviewById(id);
      if (!review) {
        return res.status(404).json({ error: 'Performance review not found' });
      }
      res.json(review);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch performance review' });
    }
  }

  async getPerformanceReviewsByPersonnel(req: Request, res: Response) {
    try {
      const { personnelId } = req.params;
      const reviews = await this.performanceService.getPerformanceReviewsByPersonnel(personnelId);
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch performance reviews' });
    }
  }

  async createPerformanceReview(req: Request, res: Response) {
    try {
      const data: CreatePerformanceReviewDto = req.body;
      const review = await this.performanceService.createPerformanceReview(data);
      res.status(201).json(review);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create performance review' });
    }
  }

  async updatePerformanceReview(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data: UpdatePerformanceReviewDto = req.body;
      const review = await this.performanceService.updatePerformanceReview(id, data);
      if (!review) {
        return res.status(404).json({ error: 'Performance review not found' });
      }
      res.json(review);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update performance review' });
    }
  }

  // Performance Evaluation Methods
  async getAllPerformanceEvaluations(req: Request, res: Response) {
    try {
      const evaluations = await this.performanceService.getAllPerformanceEvaluations();
      res.json(evaluations);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch performance evaluations' });
    }
  }

  async getPerformanceEvaluationById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const evaluation = await this.performanceService.getPerformanceEvaluationById(id);
      if (!evaluation) {
        return res.status(404).json({ error: 'Performance evaluation not found' });
      }
      res.json(evaluation);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch performance evaluation' });
    }
  }

  async getPerformanceEvaluationsByPersonnel(req: Request, res: Response) {
    try {
      const { personnelId } = req.params;
      const evaluations = await this.performanceService.getPerformanceEvaluationsByPersonnel(personnelId);
      res.json(evaluations);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch performance evaluations' });
    }
  }

  async createPerformanceEvaluation(req: Request, res: Response) {
    try {
      const data: CreatePerformanceEvaluationDto = req.body;
      const evaluation = await this.performanceService.createPerformanceEvaluation(data);
      res.status(201).json(evaluation);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create performance evaluation' });
    }
  }

  async updatePerformanceEvaluation(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data: UpdatePerformanceEvaluationDto = req.body;
      const evaluation = await this.performanceService.updatePerformanceEvaluation(id, data);
      if (!evaluation) {
        return res.status(404).json({ error: 'Performance evaluation not found' });
      }
      res.json(evaluation);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update performance evaluation' });
    }
  }
} 