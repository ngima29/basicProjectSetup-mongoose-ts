import mongoose, { Schema } from 'mongoose';
import { TestInterface } from '../interfaces';

const testSchema = new Schema<TestInterface>(
  {
    time: { type: String },
    date: { type: String },
    secret: { type: String },
    uid: { type:String, default:"555"}
  },
  {
    timestamps: true,
  }
);
export const TestModel =  mongoose.model<TestInterface>('Test', testSchema);
