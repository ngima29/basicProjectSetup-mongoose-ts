import { ModelTimestampExtend, PaginationOrderSearchExtend } from ".";
import { Types, Document } from 'mongoose';

export interface InputeTestInterface {
  otp?: string;
  time?: string;
  date?: string;
  dateTime: string
}

export interface TestInterface extends Document, ModelTimestampExtend, InputeTestInterface {
  _id: Types.ObjectId;
  secret: string;
  uid?: string
}
export interface ArgsTestInterface extends PaginationOrderSearchExtend {
}
