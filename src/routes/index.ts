import express from 'express';
import expenseRouter from './expenseRouter/expenseRouter';

const router = express.Router();

router.use('/expenses', expenseRouter);

export default router;
