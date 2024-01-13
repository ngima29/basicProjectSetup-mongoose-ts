"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.numberSchema = exports.positiveIntegerWithZeroSchema = exports.forbiddenSchema = exports.anySchema = exports.booleanSchema = exports.arraySchema = exports.dateAndTimeSchema = exports.timeSchema = exports.dateSchema = exports.urlSchema = exports.phoneSchema = exports.emailSchema = exports.positiveIntegerSchema = exports.stringSchema = void 0;
// import joiDate from "@joi/date";
const joi_1 = __importDefault(require("joi"));
//import { Types } from 'mongoose';
const Joi = joi_1.default;
// const JoiDate = joi.extend(joiDate) as typeof joi;
// const objectId = () => Joi.string().custom((value, helpers) => {
//   if (!Types.ObjectId.isValid(value)) {
//     return helpers.error('objectId.invalid', { value });
//   }
//   return value;
// }, 'MongoDB ObjectId');
const stringSchema = Joi.string();
exports.stringSchema = stringSchema;
const numberSchema = Joi.number();
exports.numberSchema = numberSchema;
const positiveIntegerSchema = Joi.number().integer().min(1);
exports.positiveIntegerSchema = positiveIntegerSchema;
const positiveIntegerWithZeroSchema = Joi.number().integer().min(0);
exports.positiveIntegerWithZeroSchema = positiveIntegerWithZeroSchema;
const emailSchema = Joi.string().email({
    minDomainSegments: 2,
    //tlds: { allow: ['com', 'net'] } 
}).lowercase();
exports.emailSchema = emailSchema;
// const phoneSchema = Joi.string()
//   .min(7)
//   .max(14)
//   .pattern(/^([+]|[00]{2})([0-9]|[ -])*/);
const phoneSchema = Joi.string()
    .length(10)
    .pattern(/^9[0-9]*$/);
exports.phoneSchema = phoneSchema;
const urlSchema = Joi.string().uri();
exports.urlSchema = urlSchema;
const dateSchema = Joi.date();
exports.dateSchema = dateSchema;
// .format(["YYYY/MM/DD", "YYYY-MM-DD"]);
const timeSchema = Joi.string();
exports.timeSchema = timeSchema;
// date().format(["HH:mm:ss"]);
const dateAndTimeSchema = Joi.date();
exports.dateAndTimeSchema = dateAndTimeSchema;
const arraySchema = Joi.array();
exports.arraySchema = arraySchema;
const booleanSchema = Joi.boolean();
exports.booleanSchema = booleanSchema;
const anySchema = Joi.any();
exports.anySchema = anySchema;
const forbiddenSchema = Joi.forbidden();
exports.forbiddenSchema = forbiddenSchema;
