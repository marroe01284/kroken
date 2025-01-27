import { Router } from 'express';
import { getAllLures, getLureById, createLure, updateLure, deleteLure } from '../controllers/lureControll.js';

const router = Router();

router.get('/', getAllLures);
router.get('/:id', getLureById);
router.post('/', createLure);
router.put('/:id', updateLure);
router.delete('/:id', deleteLure);

export default router;