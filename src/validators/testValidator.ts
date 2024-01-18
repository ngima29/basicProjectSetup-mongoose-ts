import Joi from 'joi';
import { stringSchema, dateSchema,arraySchema } from './schemas'; 


const createTest = Joi.object({
  otp: stringSchema.required().label('otp'),
});



export { createTest };
