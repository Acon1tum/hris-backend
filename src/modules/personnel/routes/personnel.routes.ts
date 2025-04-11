import { Router, Request, Response } from 'express';
import { PersonnelController } from '../controllers/personnel.controller';
import { CreatePersonnelDto, UpdatePersonnelDto } from '../types/personnel.types';

const router = Router();
const personnelController = new PersonnelController();

// Personnel routes
router.get('/', (req: Request, res: Response) => personnelController.getAllPersonnel(req, res));
router.get('/:id', (req: Request<{ id: string }>, res: Response) => personnelController.getPersonnelById(req, res));
router.post('/', (req: Request<{}, {}, CreatePersonnelDto>, res: Response) => personnelController.createPersonnel(req, res));
router.put('/:id', (req: Request<{ id: string }, {}, UpdatePersonnelDto>, res: Response) => personnelController.updatePersonnel(req, res));
router.delete('/:id', (req: Request<{ id: string }>, res: Response) => personnelController.deletePersonnel(req, res));

export default router; 