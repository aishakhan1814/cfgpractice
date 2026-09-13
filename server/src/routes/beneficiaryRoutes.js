import { Router } from 'express';
import { beneficiaryController } from '../controllers/beneficiaryController.js';
import { interactionController } from '../controllers/interactionController.js';

const router = Router();

// GET /api/beneficiaries
router.get('/', beneficiaryController.getAll);

// GET /api/beneficiaries/:id
router.get('/:id', beneficiaryController.getById);

// PATCH /api/beneficiaries/:id/status
router.patch('/:id/status', beneficiaryController.updateStatus);

// PATCH /api/beneficiaries/:id
router.patch('/:id', beneficiaryController.updateStatus);

// POST /api/beneficiaries/:id/interactions
router.post('/:id/interactions', interactionController.create);

export default router;
