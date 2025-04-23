import mongoose, { Document, Schema } from 'mongoose';

export interface IExpense extends Document {
  description: string;
  date: Date;
  amount: number;
}

export interface ApiExpense {
  description?: string;
  date?: Date;
  amount?: number;
}

const ExpenseSchema: Schema = new Schema(
  {
    description: { type: String, required: true },
    date: { type: Date, required: true },
    amount: { type: Number, required: true },
  },
  { timestamps: true },
);

ExpenseSchema.methods.toJSON = function () {
  const obj = this._doc;
  obj.id = obj._id; // _id를 id로 변경
  delete obj._id; // _id 제거
  delete obj.__v; // __v 제거
  return obj;
};

export default mongoose.model<IExpense>('Expense', ExpenseSchema);
