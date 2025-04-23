import express from 'express';
import { createExpense, deleteExpense, loadAllExpenses, updateExpense } from '../../controllers/expenseController';

const router = express.Router();

router.post('/', createExpense);
router.put('/:id', updateExpense);
router.get('/', loadAllExpenses);
router.delete('/:id', deleteExpense);

export default router;
