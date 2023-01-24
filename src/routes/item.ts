import { Router } from 'express';
import getAllItems from '../controllers/getAllItems';
import getItemId from '../controllers/getItemId';

const router = Router();

router.get('/', getAllItems);

router.get('/:id', getItemId);

export default router;
