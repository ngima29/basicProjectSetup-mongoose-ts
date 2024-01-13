import Joi from 'joi';
import { stringSchema, dateSchema,arraySchema } from './schemas'; 
import { InputeArticleInterface } from '../interfaces';

const createArticle = Joi.object<InputeArticleInterface>({
  title: stringSchema.required().label('Title'),
  author: stringSchema.required().label('Author'),
  image: Joi.binary().optional().label('Image'),
  content: stringSchema.required().label('Content'),
  publishDate: dateSchema.required().label('Publish Date'),
  tags: arraySchema.items(stringSchema).required().label('Tags'),
});

const updateArticle = Joi.object({
  title: stringSchema.optional().label('Title'),
  author: stringSchema.optional().label('Author'),
  image: Joi.binary().optional().label('Image'),
  content: stringSchema.optional().label('Content'),
  publishDate: dateSchema.optional().label('Publish Date'),
  tags: arraySchema.items(stringSchema).optional().label('Tags'),
});

export { createArticle, updateArticle };
