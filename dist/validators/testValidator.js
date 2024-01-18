"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTest = void 0;
const joi_1 = __importDefault(require("joi"));
const schemas_1 = require("./schemas");
const createTest = joi_1.default.object({
    otp: schemas_1.stringSchema.required().label('otp'),
});
exports.createTest = createTest;
