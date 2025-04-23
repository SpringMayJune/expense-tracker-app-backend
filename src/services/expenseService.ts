import { Error } from 'mongoose';
import Expense, { ApiExpense } from '../models/expense';

export const addNewExpense = async (expense: ApiExpense) => {
  try {
    const newExpense = await Expense.create(expense);
    return newExpense;
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('Unknown error occurred');
    }
  }
};

export const editExpense = async (id: string, toBeUpdatedInfo: ApiExpense) => {
  const toBeUpdatedExpense = await Expense.findByIdAndUpdate(id, toBeUpdatedInfo, { new: true });
  if (!toBeUpdatedExpense) {
    throw new Error('Expense not found');
  } else {
    return toBeUpdatedExpense;
  }
};

export const getAllExpenses = async () => {
  const allExpenses = await Expense.find();
  if (!allExpenses) {
    throw new Error('Expense not found');
  } else {
    return allExpenses;
  }
};

export const removeExpense = async (id: string) => {
  const expense = Expense.findById(id);
  if (!expense) {
    throw new Error('Expense not found');
  } else {
    await Expense.findByIdAndDelete(id);
  }
};
