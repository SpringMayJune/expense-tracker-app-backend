import { Request, Response } from 'express';
import { ApiExpense } from '../models/expense';
import { addNewExpense, editExpense, getAllExpenses, removeExpense } from '../services/expenseService';

export const createExpense = async (req: Request, res: Response) => {
  try {
    const { description, date, amount } = req.body;
    const expense: ApiExpense = {
      description: description,
      date: date,
      amount: amount,
    };

    const newExpense = await addNewExpense(expense);
    res.status(201).json({ newExpense: newExpense, message: 'new Expense is added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

export const updateExpense = async (req: Request, res: Response) => {
  try {
    const { description, date, amount } = req.body;
    const { id } = req.params;
    const toBeUpdatedInfo: ApiExpense = {
      description: description,
      date: date,
      amount: amount,
    };

    const updatedExpesne = await editExpense(id, toBeUpdatedInfo);
    res.status(200).json({ updatedExpesne: updatedExpesne, message: 'Expense is updated successfully' });
  } catch (error) {
    if (error instanceof Error && error.message === 'Expense not found') {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Server Error', error });
    }
  }
};

export const loadAllExpenses = async (req: Request, res: Response) => {
  try {
    const allExpenses = await getAllExpenses();
    res.status(200).json({ allExpenses: allExpenses, message: 'Expenses are loaded successfully' });
  } catch (error) {
    if (error instanceof Error && error.message === 'Expense not found') {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Server Error', error });
    }
  }
};

export const deleteExpense = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await removeExpense(id);
    res.status(200).json({ message: 'Expense is deleted successfully' });
  } catch (error) {
    if (error instanceof Error && error.message === 'Expense not found') {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Server Error', error });
    }
  }
};
