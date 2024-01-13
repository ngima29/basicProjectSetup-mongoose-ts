"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateArticle = exports.createArticle = void 0;
const joi_1 = __importDefault(require("joi"));
const schemas_1 = require("./schemas");
const createArticle = joi_1.default.object({
    title: schemas_1.stringSchema.required().label('Title'),
    author: schemas_1.stringSchema.required().label('Author'),
    // image: Joi.binary().optional().label('Image'),
    content: schemas_1.stringSchema.required().label('Content'),
    publishDate: schemas_1.dateSchema.required().label('Publish Date'),
    tags: schemas_1.arraySchema.items(schemas_1.stringSchema).required().label('Tags'),
});
exports.createArticle = createArticle;
const updateArticle = joi_1.default.object({
    title: schemas_1.stringSchema.optional().label('Title'),
    author: schemas_1.stringSchema.optional().label('Author'),
    //image: Joi.binary().optional().label('Image'),
    content: schemas_1.stringSchema.optional().label('Content'),
    publishDate: schemas_1.dateSchema.optional().label('Publish Date'),
    tags: schemas_1.arraySchema.items(schemas_1.stringSchema).optional().label('Tags'),
});
exports.updateArticle = updateArticle;
