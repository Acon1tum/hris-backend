import { Router, Request, Response } from 'express';
import { PersonnelController } from '../controllers/personnel.controller';
import { CreatePersonnelDto, UpdatePersonnelDto } from '../types/personnel.types';
import { validate } from '../../../middleware/validator';
import { createPersonnelSchema, updatePersonnelSchema } from '../schemas/personnel.schema';
import { authMiddleware } from '../../../middleware/auth';

const router = Router();
const personnelController = new PersonnelController();

// Personnel routes
router.get('/', authMiddleware, async (req: Request, res: Response) => {
  try {
    // Your get all personnel logic here
    res.json([]);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:id', authMiddleware, async (req: Request<{ id: string }>, res: Response) => {
  try {
    // Your get personnel by ID logic here
    res.json({});
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/', authMiddleware, validate(createPersonnelSchema), async (req: Request<{}, {}, CreatePersonnelDto>, res: Response) => {
  try {
    // Your create personnel logic here
    res.status(201).json({ message: 'Personnel created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/:id', authMiddleware, validate(updatePersonnelSchema), async (req: Request<{ id: string }, {}, UpdatePersonnelDto>, res: Response) => {
  try {
    // Your update personnel logic here
    res.json({ message: 'Personnel updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/:id', (req: Request<{ id: string }>, res: Response) => personnelController.deletePersonnel(req, res));

export default router; 